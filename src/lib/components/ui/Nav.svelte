<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { spring } from 'svelte/motion';

  let scrollY = $state(0);
  let isScrolled = $derived(scrollY > 50);

  const navItems = [
    { href: '#sobre-mi', label: 'Sobre mí' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contacto', label: 'Contacto' }
  ];

  function handleScroll() {
    scrollY = window.scrollY;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav
  class="fixed left-0 right-0 top-0 z-50 transition-all duration-300 {isScrolled
    ? 'bg-dark-950/80 backdrop-blur-lg'
    : 'bg-transparent'}"
>
  <div class="container-wide mx-auto flex items-center justify-between px-6 py-4">
    <a href="/" class="text-xl font-bold text-white transition-colors hover:text-primary-400">
      SA
    </a>

    <div class="hidden items-center gap-8 md:flex">
      {#each navItems as item}
        <a
          href={item.href}
          class="text-sm font-medium text-dark-300 transition-colors hover:text-white"
        >
          {item.label}
        </a>
      {/each}

      <a href="#contacto" class="btn-primary text-sm">
        Hablemos
      </a>
    </div>

    <!-- Mobile menu button -->
    <button class="text-white md:hidden" aria-label="Menu">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</nav>
