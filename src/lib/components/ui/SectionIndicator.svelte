<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  const sections = [
    { id: 'hero', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contacto', label: 'Contacto' }
  ];

  let activeSection = $state('hero');
  let isVisible = $state(false);
  let hoveredSection = $state<string | null>(null);

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection = entry.target.id;
        }
      });
    }, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Show indicator after scrolling past hero
    const handleScroll = () => {
      isVisible = window.scrollY > window.innerHeight * 0.5;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

{#if isVisible}
  <nav
    class="fixed right-6 top-1/2 z-50 -translate-y-1/2"
    transition:fade={{ duration: 300 }}
    aria-label="Navegación de secciones"
  >
    <ul class="flex flex-col gap-4">
      {#each sections as section}
        <li class="relative">
          <button
            onclick={() => scrollToSection(section.id)}
            onmouseenter={() => (hoveredSection = section.id)}
            onmouseleave={() => (hoveredSection = null)}
            class="group flex items-center justify-end gap-3"
            aria-label="Ir a {section.label}"
            aria-current={activeSection === section.id ? 'true' : undefined}
          >
            <!-- Tooltip -->
            {#if hoveredSection === section.id}
              <span
                class="whitespace-nowrap rounded-lg bg-dark-800 px-3 py-1.5 text-sm font-medium text-white shadow-lg"
                transition:fly={{ x: 10, duration: 200 }}
              >
                {section.label}
              </span>
            {/if}

            <!-- Dot indicator -->
            <span
              class="relative flex h-3 w-3 items-center justify-center"
            >
              <!-- Outer ring on active -->
              {#if activeSection === section.id}
                <span
                  class="absolute h-5 w-5 rounded-full border border-primary-500/50"
                  transition:fade={{ duration: 200 }}
                ></span>
              {/if}

              <!-- Inner dot -->
              <span
                class="h-2.5 w-2.5 rounded-full transition-all duration-300 {activeSection === section.id
                  ? 'bg-primary-500 scale-100'
                  : 'bg-dark-500 scale-75 group-hover:bg-dark-300 group-hover:scale-100'}"
              ></span>
            </span>
          </button>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
