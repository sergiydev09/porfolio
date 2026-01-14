<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { enhance } from '$app/forms';

  let visible = $state(false);
  let sectionRef: HTMLElement;
  let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
  let errorMessage = $state('');

  const services = [
    { value: 'leadership', label: 'Liderazgo Técnico (CTO/Chapter Lead)' },
    { value: 'mobile', label: 'Desarrollo Mobile (Android/Flutter/KMP)' },
    { value: 'web-desktop', label: 'Web & Desktop' },
    { value: 'backend', label: 'Backend & Cloud (Firebase/Supabase)' },
    { value: 'ai', label: 'Inteligencia Artificial' },
    { value: 'mentoring', label: 'Mentoring & Formación' },
    { value: 'other', label: 'Otro' }
  ];

  const budgets = [
    { value: 'under_5k', label: 'Menos de 5.000€' },
    { value: '5k_15k', label: '5.000€ - 15.000€' },
    { value: '15k_50k', label: '15.000€ - 50.000€' },
    { value: 'over_50k', label: 'Más de 50.000€' },
    { value: 'retainer', label: 'Retainer mensual' }
  ];

  let formData = $state({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    formState = 'submitting';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al enviar');

      formState = 'success';
      formData = { name: '', email: '', company: '', service: '', budget: '', message: '' };
    } catch (error) {
      formState = 'error';
      errorMessage = 'Ha ocurrido un error. Por favor, inténtalo de nuevo.';
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef);
    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionRef} id="contacto" class="section">
  <div class="container-narrow">
    {#if visible}
      <div in:fly={{ y: 30, duration: 600 }} class="mb-16 text-center">
        <h2 class="heading-2 mb-4 text-white">Hablemos</h2>
        <p class="mx-auto max-w-2xl text-dark-400">
          Cuéntame sobre tu proyecto y veamos cómo puedo ayudarte
        </p>
      </div>

      <div in:fly={{ y: 30, duration: 600, delay: 100 }} class="card max-w-2xl mx-auto">
        {#if formState === 'success'}
          <div in:scale={{ duration: 300 }} class="py-12 text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="heading-3 mb-2 text-white">¡Mensaje enviado!</h3>
            <p class="text-dark-400">Te responderé lo antes posible.</p>
            <button
              class="btn-secondary mt-6"
              onclick={() => (formState = 'idle')}
            >
              Enviar otro mensaje
            </button>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="space-y-6">
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label for="name" class="label">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  bind:value={formData.name}
                  required
                  class="input"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label for="email" class="label">Email *</label>
                <input
                  type="email"
                  id="email"
                  bind:value={formData.email}
                  required
                  class="input"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label for="company" class="label">Empresa</label>
              <input
                type="text"
                id="company"
                bind:value={formData.company}
                class="input"
                placeholder="Nombre de tu empresa (opcional)"
              />
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label for="service" class="label">Servicio de interés</label>
                <select id="service" bind:value={formData.service} class="input">
                  <option value="">Selecciona un servicio</option>
                  {#each services as service}
                    <option value={service.value}>{service.label}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label for="budget" class="label">Presupuesto estimado</label>
                <select id="budget" bind:value={formData.budget} class="input">
                  <option value="">Selecciona un rango</option>
                  {#each budgets as budget}
                    <option value={budget.value}>{budget.label}</option>
                  {/each}
                </select>
              </div>
            </div>

            <div>
              <label for="message" class="label">Mensaje *</label>
              <textarea
                id="message"
                bind:value={formData.message}
                required
                rows="5"
                class="input resize-none"
                placeholder="Cuéntame sobre tu proyecto, equipo y qué buscas conseguir..."
              ></textarea>
            </div>

            {#if formState === 'error'}
              <div in:fade class="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-400">
                {errorMessage}
              </div>
            {/if}

            <button
              type="submit"
              disabled={formState === 'submitting'}
              class="btn-primary w-full"
            >
              {#if formState === 'submitting'}
                <span class="inline-block animate-spin mr-2">⏳</span>
                Enviando...
              {:else}
                Enviar mensaje
              {/if}
            </button>
          </form>
        {/if}
      </div>
    {/if}
  </div>
</section>
