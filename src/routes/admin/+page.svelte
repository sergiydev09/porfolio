<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import type { Lead } from '$lib/types/database';

  // Placeholder data - would come from Supabase
  let leads = $state<Lead[]>([
    {
      id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      name: 'Juan García',
      email: 'juan@startup.com',
      company: 'TechStartup',
      services_interested: ['cto'],
      budget: '15k_50k',
      timeline: null,
      message: 'Buscamos un CTO para liderar nuestro equipo técnico...',
      how_found: null,
      source: 'direct',
      utm_campaign: null,
      utm_medium: null,
      landing_page: '/',
      user_agent: null,
      ip_country: 'ES',
      status: 'new',
      notes: null,
      follow_up_date: null,
      estimated_value: 15000,
      archived: false
    }
  ]);

  let stats = $state({
    totalLeads: 12,
    newLeads: 3,
    conversionRate: 25,
    visitorsThisMonth: 1240
  });

  let selectedStatus = $state<string>('all');

  const statusColors: Record<string, string> = {
    new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    in_progress: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    won: 'bg-green-500/20 text-green-400 border-green-500/30',
    lost: 'bg-red-500/20 text-red-400 border-red-500/30',
    spam: 'bg-dark-500/20 text-dark-400 border-dark-500/30'
  };

  const statusLabels: Record<string, string> = {
    new: 'Nuevo',
    contacted: 'Contactado',
    in_progress: 'En progreso',
    won: 'Ganado',
    lost: 'Perdido',
    spam: 'Spam'
  };

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  // TODO: Add Supabase realtime subscription
  // onMount(() => {
  //   const channel = supabase
  //     .channel('leads')
  //     .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, (payload) => {
  //       leads = [payload.new as Lead, ...leads];
  //     })
  //     .subscribe();
  //
  //   return () => channel.unsubscribe();
  // });
</script>

<svelte:head>
  <title>Admin Dashboard | Sergiy Alonso</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-dark-950 px-6 py-8">
  <div class="mx-auto max-w-7xl">
    <!-- Header -->
    <header class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Dashboard</h1>
        <p class="text-dark-400">Gestión de leads y métricas</p>
      </div>
      <a href="/" class="btn-secondary text-sm">
        ← Volver al sitio
      </a>
    </header>

    <!-- KPI Cards -->
    <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="card">
        <p class="text-sm text-dark-400">Leads totales</p>
        <p class="text-3xl font-bold text-white">{stats.totalLeads}</p>
        <p class="mt-1 text-xs text-green-400">+12% vs mes anterior</p>
      </div>
      <div class="card">
        <p class="text-sm text-dark-400">Leads nuevos</p>
        <p class="text-3xl font-bold text-primary-400">{stats.newLeads}</p>
        <p class="mt-1 text-xs text-dark-500">Esta semana</p>
      </div>
      <div class="card">
        <p class="text-sm text-dark-400">Tasa de conversión</p>
        <p class="text-3xl font-bold text-white">{stats.conversionRate}%</p>
        <p class="mt-1 text-xs text-green-400">+5% vs mes anterior</p>
      </div>
      <div class="card">
        <p class="text-sm text-dark-400">Visitantes</p>
        <p class="text-3xl font-bold text-white">{stats.visitorsThisMonth.toLocaleString()}</p>
        <p class="mt-1 text-xs text-dark-500">Este mes</p>
      </div>
    </div>

    <!-- Leads Section -->
    <section class="card">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-white">Leads recientes</h2>
        <select bind:value={selectedStatus} class="input w-auto">
          <option value="all">Todos los estados</option>
          {#each Object.entries(statusLabels) as [value, label]}
            <option {value}>{label}</option>
          {/each}
        </select>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-dark-800 text-left">
              <th class="pb-3 text-sm font-medium text-dark-400">Nombre</th>
              <th class="pb-3 text-sm font-medium text-dark-400">Empresa</th>
              <th class="pb-3 text-sm font-medium text-dark-400">Servicio</th>
              <th class="pb-3 text-sm font-medium text-dark-400">Estado</th>
              <th class="pb-3 text-sm font-medium text-dark-400">Fecha</th>
              <th class="pb-3 text-sm font-medium text-dark-400"></th>
            </tr>
          </thead>
          <tbody>
            {#each leads as lead}
              <tr class="border-b border-dark-800/50 hover:bg-dark-800/30 transition-colors">
                <td class="py-4">
                  <div>
                    <p class="font-medium text-white">{lead.name}</p>
                    <p class="text-sm text-dark-400">{lead.email}</p>
                  </div>
                </td>
                <td class="py-4 text-dark-300">{lead.company || '-'}</td>
                <td class="py-4 text-dark-300">
                  {lead.services_interested?.join(', ') || '-'}
                </td>
                <td class="py-4">
                  <span class="inline-block rounded-full border px-2 py-1 text-xs {statusColors[lead.status]}">
                    {statusLabels[lead.status]}
                  </span>
                </td>
                <td class="py-4 text-sm text-dark-400">
                  {formatDate(lead.created_at)}
                </td>
                <td class="py-4">
                  <button class="text-primary-400 hover:text-primary-300 text-sm">
                    Ver
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if leads.length === 0}
        <div class="py-12 text-center text-dark-400">
          No hay leads para mostrar
        </div>
      {/if}
    </section>
  </div>
</div>
