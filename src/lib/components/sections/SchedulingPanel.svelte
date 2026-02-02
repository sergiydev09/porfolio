<script lang="ts">
	import { fade } from "svelte/transition";
	import { onMount, onDestroy } from "svelte";
	import { meetingService } from "$lib/services/meeting.service";
	import type { Meeting } from "$lib/core/entities/meeting";
	import { getTranslations, getLanguage } from "$lib/i18n/index.svelte";

	let i18n = $derived(getTranslations());

	// Minimum hours before a meeting can be booked
	const MIN_HOURS_NOTICE = 6;

	// Calendar state
	let currentDate = $state(new Date());
	let selectedDate = $state<Date | null>(null);
	let selectedTime = $state<string | null>(null);
	let initialized = $state(false);

	// Booking form state
	let showBookingForm = $state(false);
	let guestName = $state("");
	let guestEmail = $state("");
	let meetingObjective = $state("");
	let isSubmitting = $state(false);
	let bookingSuccess = $state(false);
	let bookingError = $state<string | null>(null);

	// Meetings data
	let existingMeetings = $state<Meeting[]>([]);
	let loadingMeetings = $state(false);
	let meetingsUnsubscribe: (() => void) | null = null;

	// Reference to time slots container for scrolling
	let timeSlotsContainer = $state<HTMLDivElement | null>(null);

	// Track if we need to scroll after loading completes
	let pendingScrollToFirstSlot = $state(false);

	// Generate time slots from 8:00 to 22:00 in 15-minute increments
	const allTimeSlots = $derived.by(() => {
		const slots: string[] = [];
		for (let hour = 8; hour < 22; hour++) {
			for (let minute = 0; minute < 60; minute += 15) {
				slots.push(
					`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
				);
			}
		}
		return slots;
	});

	// Auto-select first available day on mount
	onMount(async () => {
		await selectFirstAvailableDay();
		initialized = true;
	});

	// Effect to scroll to first available slot after loading completes
	$effect(() => {
		if (pendingScrollToFirstSlot && !loadingMeetings && timeSlotsContainer) {
			// Use a small timeout to ensure DOM is fully rendered
			setTimeout(() => {
				scrollToFirstAvailableSlot();
				pendingScrollToFirstSlot = false;
			}, 50);
		}
	});

	async function selectFirstAvailableDay() {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Check up to 60 days ahead
		for (let i = 0; i < 60; i++) {
			const checkDate = new Date(today);
			checkDate.setDate(today.getDate() + i);

			// Check if this day has any available slots
			if (checkDayHasAvailableSlots(checkDate)) {
				selectedDate = checkDate;
				// Update current month view if needed
				if (
					checkDate.getMonth() !== currentDate.getMonth() ||
					checkDate.getFullYear() !== currentDate.getFullYear()
				) {
					currentDate = new Date(
						checkDate.getFullYear(),
						checkDate.getMonth(),
						1,
					);
				}
				loadMeetingsForDate(checkDate);
				// Mark that we need to scroll after loading completes
				pendingScrollToFirstSlot = true;
				return;
			}
		}

		// Fallback to today if no available day found
		selectedDate = today;
		loadMeetingsForDate(today);
	}

	function checkDayHasAvailableSlots(date: Date): boolean {
		const now = new Date();
		const minBookingTime = new Date(
			now.getTime() + MIN_HOURS_NOTICE * 60 * 60 * 1000,
		);

		// Check each working hour slot (8:00 to 21:00) to see if any is available
		for (let hour = 8; hour <= 21; hour++) {
			const slotStart = new Date(date);
			slotStart.setHours(hour, 0, 0, 0);

			// Slot is available if it's after the minimum booking time
			if (slotStart >= minBookingTime) {
				return true;
			}
		}

		return false;
	}

	function scrollToFirstAvailableSlot() {
		if (!timeSlotsContainer || !selectedDate) return;

		// Find index of first available slot
		const firstAvailableIndex = allTimeSlots.findIndex((time) =>
			isSlotAvailable(time),
		);

		if (firstAvailableIndex === -1) return;

		// Each slot is 56px (h-14 = 3.5rem = 56px)
		const slotHeight = 56;
		const scrollPosition = Math.max(
			0,
			(firstAvailableIndex - 1) * slotHeight,
		);

		timeSlotsContainer.scrollTo({
			top: scrollPosition,
			behavior: "smooth",
		});
	}

	// Get calendar data for current month
	const calendarData = $derived.by(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);

		// Get the day of week for the first day (0 = Sunday, we want Monday = 0)
		let startDayOfWeek = firstDay.getDay() - 1;
		if (startDayOfWeek < 0) startDayOfWeek = 6;

		const daysInMonth = lastDay.getDate();
		const prevMonthLastDay = new Date(year, month, 0).getDate();

		// Previous month days
		const prevDays: { day: number; isCurrentMonth: boolean; date: Date }[] =
			[];
		for (let i = startDayOfWeek - 1; i >= 0; i--) {
			const day = prevMonthLastDay - i;
			prevDays.push({
				day,
				isCurrentMonth: false,
				date: new Date(year, month - 1, day),
			});
		}

		// Current month days
		const currentDays: {
			day: number;
			isCurrentMonth: boolean;
			date: Date;
		}[] = [];
		for (let i = 1; i <= daysInMonth; i++) {
			currentDays.push({
				day: i,
				isCurrentMonth: true,
				date: new Date(year, month, i),
			});
		}

		// Next month days to fill the grid
		const totalCells =
			Math.ceil((prevDays.length + currentDays.length) / 7) * 7;
		const nextDays: { day: number; isCurrentMonth: boolean; date: Date }[] =
			[];
		for (
			let i = 1;
			nextDays.length < totalCells - prevDays.length - currentDays.length;
			i++
		) {
			nextDays.push({
				day: i,
				isCurrentMonth: false,
				date: new Date(year, month + 1, i),
			});
		}

		return [...prevDays, ...currentDays, ...nextDays];
	});

	// Check if a slot is too soon (less than MIN_HOURS_NOTICE hours from now)
	function isSlotTooSoon(time: string): boolean {
		if (!selectedDate) return false;

		const [hours, minutes] = time.split(":").map(Number);
		const slotStart = new Date(selectedDate);
		slotStart.setHours(hours, minutes, 0, 0);

		const now = new Date();
		const minBookingTime = new Date(
			now.getTime() + MIN_HOURS_NOTICE * 60 * 60 * 1000,
		);

		return slotStart < minBookingTime;
	}

	// Check if a slot would create a meeting that overlaps with existing ones
	// A slot at time T creates a meeting [T, T+60min]
	// It overlaps with existing meeting [M, M+60min] if: T < M+60 AND T+60 > M
	function isSlotBusy(time: string): boolean {
		if (!selectedDate) return false;

		const [hours, minutes] = time.split(":").map(Number);
		const slotStart = new Date(selectedDate);
		slotStart.setHours(hours, minutes, 0, 0);
		const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000); // 1 hour later

		return existingMeetings.some((meeting) => {
			const meetingStart = meeting.start_time;
			const meetingEnd = meeting.end_time;
			// Check for overlap: new meeting starts before existing ends AND new meeting ends after existing starts
			return slotStart < meetingEnd && slotEnd > meetingStart;
		});
	}

	// Check if slot is outside working hours
	function isSlotOutsideHours(time: string): boolean {
		if (!selectedDate) return false;

		const [hours, minutes] = time.split(":").map(Number);
		const slotStart = new Date(selectedDate);
		slotStart.setHours(hours, minutes, 0, 0);

		const slotEnd = new Date(slotStart);
		slotEnd.setHours(slotEnd.getHours() + 1);

		// Check if slot end time is within working hours (before 23:00)
		return (
			slotEnd.getHours() > 22 ||
			(slotEnd.getHours() === 22 && slotEnd.getMinutes() > 0)
		);
	}

	// Check if a time slot is available (not busy, not too soon, within hours)
	function isSlotAvailable(time: string): boolean {
		if (!selectedDate) return false;
		if (isSlotTooSoon(time)) return false;
		if (isSlotBusy(time)) return false;
		if (isSlotOutsideHours(time)) return false;
		return true;
	}

	// Load meetings for selected date with real-time updates
	function loadMeetingsForDate(date: Date) {
		// Unsubscribe from previous listener
		if (meetingsUnsubscribe) {
			meetingsUnsubscribe();
			meetingsUnsubscribe = null;
		}

		loadingMeetings = true;
		loadingMeetings = true;

		// Subscribe to real-time updates via Service
		meetingsUnsubscribe = meetingService.subscribeToMeetings(
			date,
			(meetings) => {
				existingMeetings = meetings;
				loadingMeetings = false;
			},
			(error) => {
				console.error("Error loading meetings:", error);
				loadingMeetings = false;
			},
		);
	}

	// Cleanup subscription on destroy
	onDestroy(() => {
		if (meetingsUnsubscribe) {
			meetingsUnsubscribe();
		}
	});

	function selectDay(dayData: {
		day: number;
		isCurrentMonth: boolean;
		date: Date;
	}) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (dayData.date < today) return; // Can't select past dates

		selectedDate = dayData.date;
		selectedTime = null;
		showBookingForm = false;
		loadMeetingsForDate(dayData.date);
		// Mark that we need to scroll after loading completes
		pendingScrollToFirstSlot = true;
	}

	function selectTime(time: string) {
		if (!isSlotAvailable(time)) return;
		selectedTime = time;
		showBookingForm = true;
	}

	function prevMonth() {
		currentDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() - 1,
			1,
		);
	}

	function nextMonth() {
		currentDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			1,
		);
	}

	function formatSelectedDateTime(): string {
		if (!selectedDate || !selectedTime) return "";

		const [hours, minutes] = selectedTime.split(":").map(Number);
		const endHour = hours + 1;

		return `${selectedDate.getDate()} ${i18n.scheduling.months[selectedDate.getMonth()]} - ${selectedTime} a ${endHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
	}

	function isToday(date: Date): boolean {
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	}

	function isPastDate(date: Date): boolean {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	}

	function isSelectedDate(date: Date): boolean {
		if (!selectedDate) return false;
		return (
			date.getDate() === selectedDate.getDate() &&
			date.getMonth() === selectedDate.getMonth() &&
			date.getFullYear() === selectedDate.getFullYear()
		);
	}

	async function submitBooking() {
		if (
			!selectedDate ||
			!selectedTime ||
			!guestName ||
			!guestEmail ||
			!meetingObjective
		) {
			bookingError = i18n.scheduling.errors.fillAll;
			return;
		}

		// Validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(guestEmail)) {
			bookingError = i18n.scheduling.errors.invalidEmail;
			return;
		}

		isSubmitting = true;
		bookingError = null;

		const [hours, minutes] = selectedTime.split(":").map(Number);
		const startTime = new Date(selectedDate);
		startTime.setHours(hours, minutes, 0, 0);

		const endTime = new Date(startTime);
		endTime.setHours(endTime.getHours() + 1);

		try {
			await meetingService.bookMeeting(
				{
					guestName,
					guestEmail,
					meetingObjective,
					startTime,
					endTime,
				},
				getLanguage(),
			);

			// Success!
			bookingSuccess = true;
			isSubmitting = false;

			// Reset form after delay
			setTimeout(() => {
				guestName = "";
				guestEmail = "";
				meetingObjective = "";
				selectedTime = null;
				showBookingForm = false;
				bookingSuccess = false;
				if (selectedDate) {
					loadMeetingsForDate(selectedDate);
				}
			}, 3000);
		} catch (error: any) {
			console.error("Booking error:", error);
			if (error.message === "invalid_email") {
				bookingError = i18n.scheduling.errors.invalidEmail;
			} else {
				bookingError = i18n.scheduling.errors.generic;
			}
			isSubmitting = false;
		}
	}

	function cancelBooking() {
		showBookingForm = false;
		selectedTime = null;
	}
</script>

<div
	id="scheduling-panel"
	class="glass-panel bg-dark-800 rounded-2xl p-0 h-full max-h-[calc(100vh-6rem)] flex flex-col shadow-lg overflow-hidden"
>
	<!-- Calendar header -->
	<div class="p-6 border-b border-dark-700 bg-dark-800 z-10">
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-xl font-bold text-white flex items-center gap-2">
				<span class="material-icons-round text-primary-500"
					>calendar_month</span
				>
				{i18n.scheduling.title}
			</h2>
			<div class="flex items-center gap-1 bg-dark-800 rounded-lg p-0.5">
				<button
					class="p-1 rounded-md hover:bg-dark-700 shadow-sm transition"
					onclick={prevMonth}
				>
					<span class="material-icons-round text-dark-500 text-sm"
						>chevron_left</span
					>
				</button>
				<span
					class="text-xs font-bold text-dark-200 px-2 min-w-[100px] text-center"
				>
					{i18n.scheduling.months[currentDate.getMonth()]}
					{currentDate.getFullYear()}
				</span>
				<button
					class="p-1 rounded-md hover:bg-dark-700 shadow-sm transition"
					onclick={nextMonth}
				>
					<span class="material-icons-round text-dark-500 text-sm"
						>chevron_right</span
					>
				</button>
			</div>
		</div>

		<!-- Calendar grid -->
		<div class="mb-2 select-none">
			<!-- Week days header -->
			<div class="grid grid-cols-7 mb-2 text-center">
				{#each i18n.scheduling.weekDays as day, i}
					<span
						class="text-[10px] font-bold {i === 2
							? 'text-primary-500'
							: 'text-dark-500'}"
					>
						{day}
					</span>
				{/each}
			</div>

			<!-- Calendar days -->
			<div class="grid grid-cols-7 gap-1 text-center text-xs">
				{#each calendarData as dayData}
					<button
						class="calendar-day-btn {isSelectedDate(dayData.date)
							? 'selected'
							: ''} {isToday(dayData.date)
							? 'ring-1 ring-primary-500/50'
							: ''}"
						class:opacity-30={!dayData.isCurrentMonth ||
							isPastDate(dayData.date)}
						class:cursor-not-allowed={isPastDate(dayData.date)}
						onclick={() => selectDay(dayData)}
						disabled={isPastDate(dayData.date)}
					>
						{dayData.day}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Time slots or Booking Form -->
	{#if showBookingForm && selectedDate && selectedTime}
		<div
			class="flex-1 overflow-y-auto relative bg-dark-950 p-4"
			transition:fade={{ duration: 200 }}
		>
			{#if bookingSuccess}
				<div
					class="flex flex-col items-center justify-center h-full text-center p-4"
				>
					<div
						class="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
					>
						<span
							class="material-icons-round text-green-400 text-3xl"
							>check_circle</span
						>
					</div>
					<h3 class="text-lg font-bold text-white mb-2">
						{i18n.scheduling.success.title}
					</h3>
					<p class="text-dark-400 text-sm">
						{i18n.scheduling.success.message}
					</p>
				</div>
			{:else}
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<button
							class="text-dark-400 hover:text-white transition flex items-center gap-1 text-sm"
							onclick={cancelBooking}
						>
							<span class="material-icons-round text-sm"
								>arrow_back</span
							>
							{i18n.scheduling.form.back}
						</button>
						<span class="text-xs text-primary-400 font-medium">
							{formatSelectedDateTime()}
						</span>
					</div>

					<div class="space-y-3">
						<div>
							<label for="guest-name" class="label text-xs"
								>{i18n.scheduling.form.fullName}</label
							>
							<input
								id="guest-name"
								type="text"
								bind:value={guestName}
								class="input text-sm py-2"
								placeholder={i18n.scheduling.form
									.namePlaceholder}
							/>
						</div>

						<div>
							<label for="guest-email" class="label text-xs"
								>{i18n.scheduling.form.email}</label
							>
							<input
								id="guest-email"
								type="email"
								bind:value={guestEmail}
								class="input text-sm py-2"
								placeholder={i18n.scheduling.form
									.emailPlaceholder}
							/>
						</div>

						<div>
							<label for="meeting-objective" class="label text-xs"
								>{i18n.scheduling.form.objective}</label
							>
							<textarea
								id="meeting-objective"
								bind:value={meetingObjective}
								class="input text-sm py-2 resize-none"
								rows="3"
								placeholder={i18n.scheduling.form
									.objectivePlaceholder}
							></textarea>
						</div>
					</div>

					{#if bookingError}
						<div
							class="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg p-2"
						>
							{bookingError}
						</div>
					{/if}

					<button
						class="w-full py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg shadow-primary-500/20 transition flex items-center justify-center gap-2"
						onclick={submitBooking}
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							<span class="animate-spin">
								<span class="material-icons-round text-sm"
									>refresh</span
								>
							</span>
							{i18n.scheduling.form.submitting}
						{:else}
							{i18n.scheduling.form.submit}
							<span class="material-icons-round text-sm"
								>event_available</span
							>
						{/if}
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<!-- Time slots -->
		<div
			class="flex-1 overflow-y-auto relative bg-dark-950"
			bind:this={timeSlotsContainer}
		>
			{#if !selectedDate}
				<div
					class="flex flex-col items-center justify-center h-full text-center p-8 text-dark-500"
				>
					<span class="material-icons-round text-4xl mb-2 opacity-50"
						>event</span
					>
					<p class="text-sm">{i18n.scheduling.selectDay}</p>
				</div>
			{:else if loadingMeetings}
				<div class="flex items-center justify-center h-full">
					<span class="animate-spin text-primary-500">
						<span class="material-icons-round">refresh</span>
					</span>
				</div>
			{:else}
				<div class="flex flex-col relative">
					{#each allTimeSlots as time}
						{@const available = isSlotAvailable(time)}
						{@const busy = isSlotBusy(time)}
						{@const tooSoon = isSlotTooSoon(time)}
						{@const outsideHours = isSlotOutsideHours(time)}
						<button
							class="time-slot {available
								? 'cursor-pointer group'
								: ''}"
							onclick={() => selectTime(time)}
							disabled={!available}
						>
							<div
								class="w-14 shrink-0 text-[10px] text-dark-400 text-right pr-2 pt-2 border-r border-dark-800 font-mono"
							>
								{time}
							</div>
							<div class="flex-1 relative">
								{#if available}
									<div
										class="time-slot-available group-hover:bg-primary-500/10 transition"
									>
										<span
											class="text-xs text-primary-400 font-medium opacity-0 group-hover:opacity-100 transition"
										>
											{i18n.scheduling.available}
										</span>
									</div>
								{:else if busy}
									<div class="time-slot-busy">
										<span
											class="text-xs text-red-400/70 font-medium"
											>{i18n.scheduling.busy}</span
										>
									</div>
								{:else if tooSoon}
									<div class="time-slot-too-soon">
										<span
											class="text-xs text-dark-500 italic"
											>{i18n.scheduling.tooSoon}</span
										>
									</div>
								{:else if outsideHours}
									<div class="flex items-center px-4 h-full">
										<span
											class="text-xs text-dark-600 italic"
											>{i18n.scheduling
												.outsideHours}</span
										>
									</div>
								{/if}
							</div>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Footer info -->
	{#if selectedDate && !showBookingForm}
		<div class="p-4 border-t border-dark-700 bg-dark-800">
			<div
				class="flex items-center justify-between text-xs text-dark-400"
			>
				<span>{i18n.scheduling.duration}</span>
				<span>{i18n.scheduling.schedule}</span>
			</div>
		</div>
	{/if}
</div>
