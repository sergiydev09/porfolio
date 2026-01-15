<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { getFirebaseDb } from '$lib/firebase/client';
	import { COLLECTIONS } from '$lib/firebase/collections';
	import {
		collection,
		query,
		orderBy,
		getDocs,
		doc,
		updateDoc,
		serverTimestamp,
		Timestamp
	} from 'firebase/firestore';
	import type { Meet } from '$lib/types/firestore';

	let meets = $state<Meet[]>([]);
	let loading = $state(true);
	let selectedMeet = $state<Meet | null>(null);
	let filterStatus = $state<string>('all');
	let editingMeetLink = $state(false);
	let newMeetLink = $state('');

	const statusColors: Record<string, string> = {
		pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
		confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
		cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
		completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		no_show: 'bg-dark-500/20 text-dark-400 border-dark-500/30'
	};

	const statusLabels: Record<string, string> = {
		pending: 'Pendiente',
		confirmed: 'Confirmada',
		cancelled: 'Cancelada',
		completed: 'Completada',
		no_show: 'No asistio'
	};

	const filteredMeets = $derived.by(() => {
		if (filterStatus === 'all') return meets;
		if (filterStatus === 'upcoming') {
			return meets.filter((m) => m.start_time.toDate() > new Date() && m.status === 'confirmed');
		}
		if (filterStatus === 'past') {
			return meets.filter((m) => m.start_time.toDate() <= new Date());
		}
		return meets.filter((m) => m.status === filterStatus);
	});

	function formatDateTime(ts: Timestamp) {
		return ts.toDate().toLocaleDateString('es-ES', {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function formatDateFull(ts: Timestamp) {
		return ts.toDate().toLocaleDateString('es-ES', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function isUpcoming(meet: Meet): boolean {
		return meet.start_time.toDate() > new Date() && meet.status === 'confirmed';
	}

	async function loadMeets() {
		const db = getFirebaseDb();
		if (!db) {
			loading = false;
			return;
		}

		try {
			const meetsQuery = query(
				collection(db, COLLECTIONS.MEETS),
				orderBy('start_time', 'desc')
			);
			const snapshot = await getDocs(meetsQuery);
			meets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Meet);
		} catch (error) {
			console.error('Error loading meets:', error);
		}
		loading = false;
	}

	async function updateMeetStatus(meetId: string, newStatus: string) {
		const db = getFirebaseDb();
		if (!db) return;

		try {
			const updateData: Record<string, unknown> = {
				status: newStatus,
				updated_at: serverTimestamp()
			};

			if (newStatus === 'cancelled') {
				updateData.cancelled_at = serverTimestamp();
			}

			await updateDoc(doc(db, COLLECTIONS.MEETS, meetId), updateData);

			meets = meets.map((m) =>
				m.id === meetId ? { ...m, status: newStatus as Meet['status'] } : m
			);
			if (selectedMeet?.id === meetId) {
				selectedMeet = { ...selectedMeet, status: newStatus as Meet['status'] };
			}
		} catch (error) {
			console.error('Error updating status:', error);
		}
	}

	async function updateMeetLink(meetId: string) {
		const db = getFirebaseDb();
		if (!db) return;

		try {
			await updateDoc(doc(db, COLLECTIONS.MEETS, meetId), {
				meet_link: newMeetLink,
				updated_at: serverTimestamp()
			});

			meets = meets.map((m) => (m.id === meetId ? { ...m, meet_link: newMeetLink } : m));
			if (selectedMeet?.id === meetId) {
				selectedMeet = { ...selectedMeet, meet_link: newMeetLink };
			}
			editingMeetLink = false;
		} catch (error) {
			console.error('Error updating meet link:', error);
		}
	}

	function selectMeet(meet: Meet) {
		selectedMeet = meet;
		newMeetLink = meet.meet_link || '';
		editingMeetLink = false;
	}

	function closeMeetDetail() {
		selectedMeet = null;
		editingMeetLink = false;
	}

	onMount(() => {
		loadMeets();
	});
</script>

<svelte:head>
	<title>Reuniones | Admin</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
</svelte:head>

<div class="px-6 py-8">
	<div class="max-w-7xl mx-auto">
		<!-- Header -->
		<header class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			<div>
				<h1 class="text-2xl font-bold text-white">Reuniones</h1>
				<p class="text-dark-400">Gestiona todas las reuniones programadas</p>
			</div>
			<div class="flex items-center gap-2">
				<select bind:value={filterStatus} class="input py-2 text-sm w-auto">
					<option value="all">Todas</option>
					<option value="upcoming">Proximas</option>
					<option value="past">Pasadas</option>
					<option value="confirmed">Confirmadas</option>
					<option value="pending">Pendientes</option>
					<option value="cancelled">Canceladas</option>
					<option value="completed">Completadas</option>
				</select>
			</div>
		</header>

		{#if loading}
			<div class="flex items-center justify-center py-20">
				<span class="animate-spin text-primary-500">
					<span class="material-icons-round text-3xl">refresh</span>
				</span>
			</div>
		{:else}
			<div class="grid lg:grid-cols-3 gap-6">
				<!-- Meets List -->
				<div class="lg:col-span-2">
					<div class="card">
						{#if filteredMeets.length === 0}
							<div class="py-12 text-center text-dark-500">
								<span class="material-icons-round text-4xl mb-2 opacity-50">event_busy</span>
								<p>No hay reuniones para mostrar</p>
							</div>
						{:else}
							<div class="space-y-2">
								{#each filteredMeets as meet}
									<button
										class="w-full text-left p-4 rounded-xl transition {selectedMeet?.id === meet.id
											? 'bg-primary-500/10 border border-primary-500/30'
											: 'bg-dark-800/50 hover:bg-dark-800 border border-transparent'}"
										onclick={() => selectMeet(meet)}
									>
										<div class="flex items-start gap-4">
											<div
												class="w-12 h-12 rounded-lg {isUpcoming(meet)
													? 'bg-green-500/10'
													: 'bg-dark-700'} flex items-center justify-center shrink-0"
											>
												<span
													class="material-icons-round {isUpcoming(meet)
														? 'text-green-400'
														: 'text-dark-400'}"
												>
													{isUpcoming(meet) ? 'videocam' : 'event'}
												</span>
											</div>
											<div class="flex-1 min-w-0">
												<div class="flex items-center gap-2 mb-1">
													<p class="font-medium text-white truncate">{meet.guest_name}</p>
													<span
														class="inline-block rounded-full border px-2 py-0.5 text-xs shrink-0 {statusColors[
															meet.status
														]}"
													>
														{statusLabels[meet.status]}
													</span>
												</div>
												<p class="text-sm text-dark-400 truncate">{meet.guest_email}</p>
												<p class="text-xs text-dark-500 mt-1">{formatDateTime(meet.start_time)}</p>
											</div>
										</div>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<!-- Meet Detail -->
				<div class="lg:col-span-1">
					{#if selectedMeet}
						<div class="card sticky top-24" in:fly={{ x: 20, duration: 200 }}>
							<div class="flex items-center justify-between mb-4">
								<h3 class="font-semibold text-white">Detalle de la reunion</h3>
								<button class="text-dark-400 hover:text-white transition" onclick={closeMeetDetail}>
									<span class="material-icons-round text-sm">close</span>
								</button>
							</div>

							<div class="space-y-4">
								<!-- Guest info -->
								<div class="flex items-center gap-3">
									<div class="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center">
										<span class="text-lg font-bold text-dark-300">
											{selectedMeet.guest_name
												.split(' ')
												.map((n) => n[0])
												.join('')
												.slice(0, 2)
												.toUpperCase()}
										</span>
									</div>
									<div>
										<p class="font-medium text-white">{selectedMeet.guest_name}</p>
										<a
											href="mailto:{selectedMeet.guest_email}"
											class="text-sm text-primary-400 hover:text-primary-300"
										>
											{selectedMeet.guest_email}
										</a>
									</div>
								</div>

								<!-- Time -->
								<div class="p-3 rounded-lg bg-dark-800/50">
									<div class="flex items-center gap-2 text-dark-400 mb-1">
										<span class="material-icons-round text-sm">schedule</span>
										<span class="text-xs font-medium">Fecha y hora</span>
									</div>
									<p class="text-white text-sm">{formatDateFull(selectedMeet.start_time)}</p>
									<p class="text-xs text-dark-500 mt-1">Duracion: 1 hora</p>
								</div>

								<!-- Objective -->
								<div class="p-3 rounded-lg bg-dark-800/50">
									<div class="flex items-center gap-2 text-dark-400 mb-1">
										<span class="material-icons-round text-sm">description</span>
										<span class="text-xs font-medium">Objetivo</span>
									</div>
									<p class="text-white text-sm">{selectedMeet.meeting_objective}</p>
								</div>

								<!-- Meet link -->
								<div class="p-3 rounded-lg bg-dark-800/50">
									<div class="flex items-center justify-between mb-1">
										<div class="flex items-center gap-2 text-dark-400">
											<span class="material-icons-round text-sm">videocam</span>
											<span class="text-xs font-medium">Enlace de Meet</span>
										</div>
										<button
											class="text-xs text-primary-400 hover:text-primary-300"
											onclick={() => {
												editingMeetLink = !editingMeetLink;
											}}
										>
											{editingMeetLink ? 'Cancelar' : 'Editar'}
										</button>
									</div>
									{#if editingMeetLink}
										<div class="flex gap-2 mt-2" transition:slide={{ duration: 150 }}>
											<input
												type="url"
												bind:value={newMeetLink}
												class="input text-sm py-1.5 flex-1"
												placeholder="https://meet.google.com/..."
											/>
											<button
												class="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm"
												onclick={() => updateMeetLink(selectedMeet!.id)}
											>
												Guardar
											</button>
										</div>
									{:else if selectedMeet.meet_link}
										<a
											href={selectedMeet.meet_link}
											target="_blank"
											rel="noopener noreferrer"
											class="text-primary-400 hover:text-primary-300 text-sm break-all"
										>
											{selectedMeet.meet_link}
										</a>
									{:else}
										<p class="text-dark-500 text-sm italic">No configurado</p>
									{/if}
								</div>

								<!-- Status -->
								<div class="p-3 rounded-lg bg-dark-800/50">
									<div class="flex items-center gap-2 text-dark-400 mb-2">
										<span class="material-icons-round text-sm">flag</span>
										<span class="text-xs font-medium">Estado</span>
									</div>
									<div class="flex flex-wrap gap-2">
										{#each Object.entries(statusLabels) as [status, label]}
											<button
												class="px-3 py-1 rounded-full text-xs border transition {selectedMeet.status ===
												status
													? statusColors[status]
													: 'border-dark-700 text-dark-500 hover:border-dark-600 hover:text-dark-400'}"
												onclick={() => updateMeetStatus(selectedMeet!.id, status)}
											>
												{label}
											</button>
										{/each}
									</div>
								</div>

								<!-- Actions -->
								{#if isUpcoming(selectedMeet) && selectedMeet.meet_link}
									<a
										href={selectedMeet.meet_link}
										target="_blank"
										rel="noopener noreferrer"
										class="w-full btn-primary text-center"
									>
										<span class="material-icons-round mr-2 text-sm">videocam</span>
										Unirse a la reunion
									</a>
								{/if}
							</div>
						</div>
					{:else}
						<div class="card text-center py-12 text-dark-500">
							<span class="material-icons-round text-4xl mb-2 opacity-50">touch_app</span>
							<p class="text-sm">Selecciona una reunion para ver los detalles</p>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
