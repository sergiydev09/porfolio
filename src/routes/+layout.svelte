<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { page } from '$app/stores';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#key $page.url.pathname}
  <div in:fly={{ y: 10, duration: 300, delay: 100 }} out:fly={{ y: -10, duration: 200 }}>
    {@render children()}
  </div>
{/key}
