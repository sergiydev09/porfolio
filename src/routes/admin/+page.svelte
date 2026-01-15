<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getFirebaseDb } from '$lib/firebase/client';
	import { COLLECTIONS } from '$lib/firebase/collections';
	import {
		collection,
		query,
		orderBy,
		limit,
		getDocs,
		where,
		Timestamp
	} from 'firebase/firestore';
	import type { Client, Meet, Page } from '$lib/types/firestore';

	// Data state
	let clients = $state<Client[]>([]);
	let meets = $state<Meet[]>([]);
	let pages = $state<Page[]>([]);
	let loading = $state(true);

	// Stats
	let stats = $state({
		totalClients: 0,
		newClientsThisWeek: 0,
		totalMeets: 0,
		upcomingMeets: 0,
		completedMeets: 0,
		visitorsThisMonth: 0,
		conversionRate: 0
	});

	const statusColors: Record<string, string> = {
		new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
		in_progress: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		won: 'bg-green-500/20 text-green-400 border-green-500/30',
		lost: 'bg-red-500/20 text-red-400 border-red-500/30',
		spam: 'bg-dark-500/20 text-dark-400 border-dark-500/30',
		pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
		confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
		cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
		completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		no_show: 'bg-dark-500/20 text-dark-400 border-dark-500/30'
	};

	const statusLabels: Record<string, string> = {
		new: 'Nuevo',
		contacted: 'Contactado',
		in_progress: 'En progreso',
		won: 'Ganado',
		lost: 'Perdido',
		spam: 'Spam',
		pending: 'Pendiente',
		confirmed: 'Confirmada',
		cancelled: 'Cancelada',
		completed: 'Completada',
		no_show: 'No asistio'
	};

	function formatDate(ts: Timestamp) {
		return ts.toDate().toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'short'
		});
	}

	function formatDateTime(ts: Timestamp) {
		return ts.toDate().toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	async function loadData() {
		const db = getFirebaseDb();
		if (!db) {
			loading = false;
			return;
		}

		const now = new Date();
		const startOfWeek = new Date(now);
		startOfWeek.setDate(now.getDate() - now.getDay());
		startOfWeek.setHours(0, 0, 0, 0);

		const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

		try {
			// Fetch clients (last 10)
			const clientsQuery = query(
				collection(db, COLLECTIONS.CLIENTS),
				orderBy('created_at', 'desc'),
				limit(10)
			);
			const clientsSnapshot = await getDocs(clientsQuery);
			clients = clientsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Client);

			// Fetch all clients for stats
			const allClientsQuery = query(collection(db, COLLECTIONS.CLIENTS));
			const allClientsSnapshot = await getDocs(allClientsQuery);
			const allClients = allClientsSnapshot.docs.map(
				(doc) => ({ id: doc.id, ...doc.data() }) as Client
			);

			// Fetch meets
			const meetsQuery = query(collection(db, COLLECTIONS.MEETS), orderBy('start_time', 'asc'));
			const meetsSnapshot = await getDocs(meetsQuery);
			meets = meetsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Meet);

			// Fetch pages (this month)
			const pagesQuery = query(
				collection(db, COLLECTIONS.PAGES),
				where('created_at', '>=', Timestamp.fromDate(startOfMonth))
			);
			const pagesSnapshot = await getDocs(pagesQuery);
			pages = pagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Page);

			// Calculate stats
			stats.totalClients = allClients.length;
			stats.newClientsThisWeek = allClients.filter(
				(c) => c.created_at.toDate() >= startOfWeek
			).length;
			stats.totalMeets = meets.length;
			stats.upcomingMeets = meets.filter(
				(m) => m.start_time.toDate() > now && m.status === 'confirmed'
			).length;
			stats.completedMeets = meets.filter((m) => m.status === 'completed').length;
			stats.visitorsThisMonth = pages.length;

			const wonClients = allClients.filter((c) => c.status === 'won').length;
			stats.conversionRate =
				stats.totalClients > 0 ? Math.round((wonClients / stats.totalClients) * 100) : 0;
		} catch (error) {
			console.error('Error loading data:', error);
		}

		loading = false;
	}

	onMount(() => {
		loadData();
	});
</script>

<svelte:head>
	<title>Dashboard | Admin</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
</svelte:head>

<div class="px-6 py-8">
	<div class="max-w-7xl mx-auto">
		<!-- Header -->
		<header class="mb-8">
			<h1 class="text-2xl font-bold text-white">Dashboard</h1>
			<p class="text-dark-400">Resumen de actividad y metricas</p>
		</header>

		{#if loading}
			<div class="flex items-center justify-center py-20">
				<span class="animate-spin text-primary-500">
					<span class="material-icons-round text-3xl">refresh</span>
				</span>
			</div>
		{:else}
			<!-- KPI Cards -->
			<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" in:fly={{ y: 20, duration: 300 }}>
				<div class="card">
					<div class="flex items-center justify-between mb-2">
						<p class="text-sm text-dark-400">Leads totales</p>
						<span class="material-icons-round text-primary-500 text-xl">people</span>
					</div>
					<p class="text-3xl font-bold text-white">{stats.totalClients}</p>
					<p class="mt-1 text-xs text-primary-400">+{stats.newClientsThisWeek} esta semana</p>
				</div>

				<div class="card">
					<div class="flex items-center justify-between mb-2">
						<p class="text-sm text-dark-400">Reuniones pendientes</p>
						<span class="material-icons-round text-green-500 text-xl">event</span>
					</div>
					<p class="text-3xl font-bold text-white">{stats.upcomingMeets}</p>
					<p class="mt-1 text-xs text-dark-500">{stats.completedMeets} completadas</p>
				</div>

				<div class="card">
					<div class="flex items-center justify-between mb-2">
						<p class="text-sm text-dark-400">Conversion</p>
						<span class="material-icons-round text-yellow-500 text-xl">trending_up</span>
					</div>
					<p class="text-3xl font-bold text-white">{stats.conversionRate}%</p>
					<p class="mt-1 text-xs text-dark-500">Leads a clientes</p>
				</div>

				<div class="card">
					<div class="flex items-center justify-between mb-2">
						<p class="text-sm text-dark-400">Visitas</p>
						<span class="material-icons-round text-blue-500 text-xl">visibility</span>
					</div>
					<p class="text-3xl font-bold text-white">{stats.visitorsThisMonth.toLocaleString()}</p>
					<p class="mt-1 text-xs text-dark-500">Este mes</p>
				</div>
			</div>

			<div class="grid lg:grid-cols-2 gap-6">
				<!-- Upcoming Meetings -->
				<section class="card" in:fly={{ y: 20, duration: 300, delay: 100 }}>
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-lg font-semibold text-white flex items-center gap-2">
							<span class="material-icons-round text-primary-500">calendar_today</span>
							Proximas reuniones
						</h2>
						<a href="/admin/meetings" class="text-primary-400 hover:text-primary-300 text-sm">
							Ver todas
						</a>
					</div>

					{#if meets.filter((m) => m.start_time.toDate() > new Date() && m.status === 'confirmed').length === 0}
						<div class="py-8 text-center text-dark-500">
							<span class="material-icons-round text-3xl mb-2 opacity-50">event_busy</span>
							<p class="text-sm">No hay reuniones programadas</p>
						</div>
					{:else}
						<div class="space-y-3">
							{#each meets
								.filter((m) => m.start_time.toDate() > new Date() && m.status === 'confirmed')
								.slice(0, 5) as meet}
								<div
									class="flex items-center gap-4 p-3 rounded-lg bg-dark-800/50 hover:bg-dark-800 transition"
								>
									<div
										class="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0"
									>
										<span class="material-icons-round text-primary-400">videocam</span>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-medium text-white truncate">{meet.guest_name}</p>
										<p class="text-xs text-dark-400 truncate">{meet.meeting_objective}</p>
									</div>
									<div class="text-right shrink-0">
										<p class="text-sm text-white">{formatDateTime(meet.start_time)}</p>
										{#if meet.meet_link}
											<a
												href={meet.meet_link}
												target="_blank"
												rel="noopener noreferrer"
												class="text-xs text-primary-400 hover:text-primary-300"
											>
												Unirse
											</a>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</section>

				<!-- Recent Leads -->
				<section class="card" in:fly={{ y: 20, duration: 300, delay: 200 }}>
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-lg font-semibold text-white flex items-center gap-2">
							<span class="material-icons-round text-primary-500">person_add</span>
							Leads recientes
						</h2>
						<a href="/admin/leads" class="text-primary-400 hover:text-primary-300 text-sm">
							Ver todos
						</a>
					</div>

					{#if clients.length === 0}
						<div class="py-8 text-center text-dark-500">
							<span class="material-icons-round text-3xl mb-2 opacity-50">inbox</span>
							<p class="text-sm">No hay leads aun</p>
						</div>
					{:else}
						<div class="space-y-3">
							{#each clients.slice(0, 5) as client}
								<div
									class="flex items-center gap-4 p-3 rounded-lg bg-dark-800/50 hover:bg-dark-800 transition"
								>
									<div
										class="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center shrink-0"
									>
										<span class="text-sm font-bold text-dark-300">
											{client.name
												.split(' ')
												.map((n) => n[0])
												.join('')
												.slice(0, 2)
												.toUpperCase()}
										</span>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-medium text-white truncate">{client.name}</p>
										<p class="text-xs text-dark-400 truncate">{client.company || client.email}</p>
									</div>
									<div class="text-right shrink-0">
										<span
											class="inline-block rounded-full border px-2 py-0.5 text-xs {statusColors[
												client.status
											]}"
										>
											{statusLabels[client.status]}
										</span>
										<p class="text-xs text-dark-500 mt-1">{formatDate(client.created_at)}</p>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</section>
			</div>
		{/if}
	</div>
</div>
