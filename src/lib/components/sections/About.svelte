<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { get } from 'svelte/store';

  let visible = $state(false);
  let sectionRef: HTMLElement;
  let displayValues = $state([0, 0, 0, 0]);

  const stats = [
    { value: 10, suffix: '+', label: 'Años experiencia' },
    { value: 50, suffix: '+', label: 'Proyectos entregados' },
    { value: 15, suffix: '+', label: 'Empresas' },
    { value: 30, suffix: '+', label: 'Personas lideradas' }
  ];

  const animatedStores = stats.map(() => tweened(0, { duration: 2000, easing: cubicOut }));

  onMount(() => {
    // Subscribe to all stores and update displayValues
    const unsubscribes = animatedStores.map((store, i) =>
      store.subscribe((value) => {
        displayValues[i] = value;
      })
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          stats.forEach((stat, i) => {
            animatedStores[i].set(stat.value);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef);

    return () => {
      observer.disconnect();
      unsubscribes.forEach((unsub) => unsub());
    };
  });
</script>

<section
  bind:this={sectionRef}
  id="sobre-mi"
  class="section bg-dark-900/30"
>
  <div class="container-narrow">
    {#if visible}
      <div in:fly={{ y: 30, duration: 600 }} class="mb-16 text-center">
        <h2 class="heading-2 mb-4 text-white">Sobre mí</h2>
        <p class="mx-auto max-w-2xl text-dark-400">
          Apasionado por la tecnología y el liderazgo de equipos
        </p>
      </div>

      <div class="grid gap-12 md:grid-cols-2">
        <div in:fly={{ y: 30, duration: 600, delay: 100 }} class="space-y-6">
          <p class="text-lg text-dark-300">
            Con más de una década en el sector tech, he tenido la oportunidad de
            construir productos desde cero, escalar startups y liderar equipos de
            alto rendimiento.
          </p>
          <p class="text-dark-400">
            Mi enfoque combina la visión técnica con la estratégica, ayudando a las
            empresas a tomar decisiones tecnológicas que impulsen su crecimiento.
            Creo en los equipos empoderados, la comunicación transparente y el
            código limpio.
          </p>
          <p class="text-dark-400">
            Ya sea como CTO, Tech Lead o Engineering Manager, mi objetivo es siempre
            el mismo: crear valor a través de la tecnología y las personas.
          </p>
        </div>

        <div in:fly={{ y: 30, duration: 600, delay: 200 }} class="grid grid-cols-2 gap-4">
          {#each stats as stat, i}
            <div class="card text-center">
              <div class="text-4xl font-bold text-gradient mb-2">
                {Math.round(displayValues[i])}{stat.suffix}
              </div>
              <div class="text-sm text-dark-400">{stat.label}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
