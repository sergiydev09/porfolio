<script lang="ts">
  import { onMount } from 'svelte';
  import ProfilePanel from '$components/sections/ProfilePanel.svelte';
  import ServicesPanel from '$components/sections/ServicesPanel.svelte';
  import SchedulingPanel from '$components/sections/SchedulingPanel.svelte';
  import Footer from '$components/sections/Footer.svelte';

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Sergiy Alonso Villar | Tech Lead Portfolio</title>
  <meta
    name="description"
    content="Tech Lead especializado en desarrollo mobile (Android, Flutter, KMP), integraciones con IA y liderazgo técnico. 15+ años de experiencia, 40+ proyectos."
  />
  <meta property="og:title" content="Sergiy Alonso Villar | Tech Lead Portfolio" />
  <meta
    property="og:description"
    content="Tech Lead especializado en desarrollo mobile, multiplatform ecosystems e integraciones con IA. Madrid, España."
  />
  <meta property="og:type" content="website" />
  <meta name="keywords" content="Tech Lead, Android, Flutter, KMP, Kotlin Multiplatform, AI Integration, Mobile Development, Madrid" />
  <link rel="canonical" href="https://sergiyalonso.tech" />

  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />

  <!-- Devicons for tech logos -->
  <link href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" rel="stylesheet" />
</svelte:head>

{#if mounted}
  <div class="min-h-screen flex flex-col">
    <!-- Main content area -->
    <div class="flex-1 p-4 md:p-6 lg:p-8 pb-16 overflow-y-auto">
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left column: Profile -->
        <div class="lg:col-span-3 flex flex-col gap-6">
          <ProfilePanel />
        </div>

        <!-- Center column: Services -->
        <div class="lg:col-span-6 flex flex-col gap-6">
          <ServicesPanel />
        </div>

        <!-- Right column: Scheduling -->
        <div class="lg:col-span-3 h-full">
          <SchedulingPanel />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
{/if}
