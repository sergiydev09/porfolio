<script lang="ts">
  import { fly, fade } from 'svelte/transition';

  let selectedDay = $state(11);
  let currentMonth = $state('Jan 2026');

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Generate calendar days
  const prevMonthDays = [30, 31]; // Last days of previous month
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const nextMonthDays = [1, 2, 3, 4, 5]; // First days of next month

  const timeSlots = [
    { time: '08:00', status: 'empty' },
    { time: '09:00', status: 'available' },
    { time: '10:00', status: 'available' },
    { time: '11:00', status: 'selected' },
    { time: '12:00', status: 'empty' },
    { time: '13:00', status: 'busy' },
    { time: '14:00', status: 'busy' },
    { time: '15:00', status: 'available' },
    { time: '16:00', status: 'available' },
    { time: '17:00', status: 'available' },
    { time: '18:00', status: 'empty' }
  ];

  function selectDay(day: number) {
    selectedDay = day;
  }

  function prevMonth() {
    // Placeholder for month navigation
  }

  function nextMonth() {
    // Placeholder for month navigation
  }
</script>

<div
  class="glass-panel bg-dark-800 rounded-2xl p-0 h-full max-h-[1050px] lg:sticky lg:top-8 flex flex-col shadow-lg overflow-hidden"
  in:fly={{ x: 30, duration: 500, delay: 300 }}
>
  <!-- Calendar header -->
  <div class="p-6 border-b border-dark-700 bg-dark-800/50 backdrop-blur-md z-10">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="material-icons-round text-primary-500">calendar_month</span>
        Scheduling
      </h2>
      <div class="flex items-center gap-1 bg-dark-800 rounded-lg p-0.5">
        <button
          class="p-1 rounded-md hover:bg-dark-700 shadow-sm transition"
          onclick={prevMonth}
        >
          <span class="material-icons-round text-dark-500 text-sm">chevron_left</span>
        </button>
        <span class="text-xs font-bold text-dark-200 px-2">{currentMonth}</span>
        <button
          class="p-1 rounded-md hover:bg-dark-700 shadow-sm transition"
          onclick={nextMonth}
        >
          <span class="material-icons-round text-dark-500 text-sm">chevron_right</span>
        </button>
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="mb-2 select-none">
      <!-- Week days header -->
      <div class="grid grid-cols-7 mb-2 text-center">
        {#each weekDays as day, i}
          <span class="text-[10px] font-bold {i === 2 ? 'text-primary-500' : 'text-dark-500'}">
            {day}
          </span>
        {/each}
      </div>

      <!-- Calendar days -->
      <div class="grid grid-cols-7 gap-1 text-center text-xs">
        <!-- Previous month days (faded) -->
        {#each prevMonthDays as day}
          <span class="text-dark-600 py-1.5 opacity-30">{day}</span>
        {/each}

        <!-- Current month days -->
        {#each currentMonthDays as day}
          <button
            class="calendar-day-btn {selectedDay === day ? 'selected' : ''}"
            onclick={() => selectDay(day)}
          >
            {day}
          </button>
        {/each}

        <!-- Next month days (faded) -->
        {#each nextMonthDays as day}
          <span class="text-dark-600 py-1.5 opacity-30">{day}</span>
        {/each}
      </div>
    </div>
  </div>

  <!-- Time slots -->
  <div class="flex-1 overflow-y-auto relative bg-dark-950">
    <div class="flex flex-col relative min-h-[500px]">
      {#each timeSlots as slot}
        <div
          class="time-slot {slot.status === 'available' ? 'cursor-pointer group' : ''} {slot.status === 'busy' ? 'bg-dark-900/50' : ''}"
        >
          <div class="w-14 shrink-0 text-[10px] text-dark-400 text-right pr-2 pt-2 border-r border-dark-800 font-mono">
            {slot.time}
          </div>
          <div class="flex-1 relative">
            {#if slot.status === 'available'}
              <div class="time-slot-available group-hover:bg-primary-500/10 transition">
                <span class="text-xs text-primary-400 font-medium opacity-0 group-hover:opacity-100 transition">
                  Available
                </span>
              </div>
            {:else if slot.status === 'selected'}
              <div class="bg-primary-600/10 border-l-4 border-primary-500 p-2 h-full flex flex-col justify-center">
                <span class="text-xs font-bold text-primary-300 block">Selected Slot</span>
                <span class="text-[10px] text-primary-400">11:00 AM - 12:00 PM</span>
              </div>
            {:else if slot.status === 'busy'}
              <div class="flex items-center px-4 h-full">
                <span class="text-xs text-dark-400 italic">Busy</span>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Confirm button -->
  <div class="p-4 border-t border-dark-700 bg-dark-800">
    <button class="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/20 transition flex items-center justify-center gap-2">
      Confirm 11:00 AM
      <span class="material-icons-round text-sm">arrow_forward</span>
    </button>
  </div>
</div>
