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
		where,
		serverTimestamp
	} from 'firebase/firestore';
	import type { Client } from '$lib/types/firestore';
	import type { Timestamp } from 'firebase/firestore';

	let clients = $state<Client[]>([]);
	let loading = $state(true);
	let selectedClient = $state<Client | null>(null);
	let filterStatus = $state<string>('all');
	let editingNotes = $state(false);
	let newNotes = $state('');

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

	const budgetLabels: Record<string, string> = {
		under_5k: 'Menos de 5.000',
		'5k_15k': '5.000 - 15.000',
		'15k_50k': '15.000 - 50.000',
		over_50k: 'Mas de 50.000'
	};

	const filteredClients = $derived.by(() => {
		if (filterStatus === 'all') return clients;
		return clients.filter((c) => c.status === filterStatus);
	});

	function formatDate(ts: Timestamp) {
		return ts.toDate().toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
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

	async function loadClients() {
		const db = getFirebaseDb();
		if (!db) {
			loading = false;
			return;
		}

		try {
			const clientsQuery = query(
				collection(db, COLLECTIONS.CLIENTS),
				where('archived', '==', false),
				orderBy('created_at', 'desc')
			);
			const snapshot = await getDocs(clientsQuery);
			clients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Client);
		} catch (error) {
			console.error('Error loading clients:', error);
		}
		loading = false;
	}

	async function updateClientStatus(clientId: string, newStatus: string) {
		const db = getFirebaseDb();
		if (!db) return;

		try {
			await updateDoc(doc(db, COLLECTIONS.CLIENTS, clientId), {
				status: newStatus,
				updated_at: serverTimestamp()
			});

			clients = clients.map((c) => (c.id === clientId ? { ...c, status: newStatus as Client['status'] } : c));
			if (selectedClient?.id === clientId) {
				selectedClient = { ...selectedClient, status: newStatus as Client['status'] };
			}
		} catch (error) {
			console.error('Error updating status:', error);
		}
	}

	async function updateClientNotes(clientId: string) {
		const db = getFirebaseDb();
		if (!db) return;

		try {
			await updateDoc(doc(db, COLLECTIONS.CLIENTS, clientId), {
				notes: newNotes,
				updated_at: serverTimestamp()
			});

			clients = clients.map((c) => (c.id === clientId ? { ...c, notes: newNotes } : c));
			if (selectedClient?.id === clientId) {
				selectedClient = { ...selectedClient, notes: newNotes };
			}
			editingNotes = false;
		} catch (error) {
			console.error('Error updating notes:', error);
		}
	}

	async function archiveClient(clientId: string) {
		const db = getFirebaseDb();
		if (!db) return;

		try {
			await updateDoc(doc(db, COLLECTIONS.CLIENTS, clientId), {
				archived: true,
				updated_at: serverTimestamp()
			});

			clients = clients.filter((c) => c.id !== clientId);
			if (selectedClient?.id === clientId) {
				selectedClient = null;
			}
		} catch (error) {
			console.error('Error archiving client:', error);
		}
	}

	function selectClient(client: Client) {
		selectedClient = client;
		newNotes = client.notes || '';
		editingNotes = false;
	}

	function closeClientDetail() {
		selectedClient = null;
		editingNotes = false;
	}

	onMount(() => {
		loadClients();
	});
</script>

<svelte:head>
	<title>Leads | Admin</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
</svelte:head>

<div class="px-6 py-8">
	<div class="max-w-7xl mx-auto">
		<!-- Header -->
		<header class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			<div>
				<h1 class="text-2xl font-bold text-white">Leads</h1>
				<p class="text-dark-400">Gestiona todos los contactos y prospectos</p>
			</div>
			<div class="flex items-center gap-2">
				<select bind:value={filterStatus} class="input py-2 text-sm w-auto">
					<option value="all">Todos</option>
					{#each Object.entries(statusLabels) as [value, label]}
						<option {value}>{label}</option>
					{/each}
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
				<!-- Clients List -->
				<div class="lg:col-span-2">
					<div class="card">
						{#if filteredClients.length === 0}
							<div class="py-12 text-center text-dark-500">
								<span class="material-icons-round text-4xl mb-2 opacity-50">inbox</span>
								<p>No hay leads para mostrar</p>
							</div>
						{:else}
							<div class="space-y-2">
								{#each filteredClients as client}
									<button
										class="w-full text-left p-4 rounded-xl transition {selectedClient?.id ===
										client.id
											? 'bg-primary-500/10 border border-primary-500/30'
											: 'bg-dark-800/50 hover:bg-dark-800 border border-transparent'}"
										onclick={() => selectClient(client)}
									>
										<div class="flex items-start gap-4">
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
												<div class="flex items-center gap-2 mb-1">
													<p class="font-medium text-white truncate">{client.name}</p>
													<span
														class="inline-block rounded-full border px-2 py-0.5 text-xs shrink-0 {statusColors[
															client.status
														]}"
													>
														{statusLabels[client.status]}
													</span>
												</div>
												<p class="text-sm text-dark-400 truncate">
													{client.company || client.email}
												</p>
												<p class="text-xs text-dark-500 mt-1">{formatDate(client.created_at)}</p>
											</div>
										</div>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<!-- Client Detail -->
				<div class="lg:col-span-1">
					{#if selectedClient}
						<div class="card sticky top-24" in:fly={{ x: 20, duration: 200 }}>
							<div class="flex items-center justify-between mb-4">
								<h3 class="font-semibold text-white">Detalle del lead</h3>
								<button class="text-dark-400 hover:text-white transition" onclick={closeClientDetail}>
									<span class="material-icons-round text-sm">close</span>
								</button>
							</div>

							<div class="space-y-4">
								<!-- Contact info -->
								<div class="flex items-center gap-3">
									<div
										class="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center"
									>
										<span class="text-lg font-bold text-dark-300">
											{selectedClient.name
												.split(' ')
												.map((n) => n[0])
												.join('')
												.slice(0, 2)
												.toUpperCase()}
										</span>
									</div>
									<div>
										<p class="font-medium text-white">{selectedClient.name}</p>
										<a
											href="mailto:{selectedClient.email}"
											class="text-sm text-primary-400 hover:text-primary-300"
										>
											{selectedClient.email}
										</a>
									</div>
								</div>

								<!-- Company -->
								{#if selectedClient.company}
									<div class="p-3 rounded-lg bg-dark-800/50">
										<div class="flex items-center gap-2 text-dark-400 mb-1">
											<span class="material-icons-round text-sm">business</span>
											<span class="text-xs font-medium">Empresa</span>
										</div>
										<p class="text-white text-sm">{selectedClient.company}</p>
									</div>
								{/if}

								<!-- Services interested -->
								{#if selectedClient.services_interested && selectedClient.services_interested.length > 0}
									<div class="p-3 rounded-lg bg-dark-800/50">
										<div class="flex items-center gap-2 text-dark-400 mb-2">
											<span class="material-icons-round text-sm">interests</span>
											<span class="text-xs font-medium">Servicios de interes</span>
										</div>
										<div class="flex flex-wrap gap-2">
											{#each selectedClient.services_interested as service}
												<span class="px-2 py-1 rounded bg-primary-500/10 text-primary-400 text-xs">
													{service}
												</span>
											{/each}
										</div>
									</div>
								{/if}

								<!-- Budget -->
								{#if selectedClient.budget}
									<div class="p-3 rounded-lg bg-dark-800/50">
										<div class="flex items-center gap-2 text-dark-400 mb-1">
											<span class="material-icons-round text-sm">payments</span>
											<span class="text-xs font-medium">Presupuesto</span>
										</div>
										<p class="text-white text-sm">
											{budgetLabels[selectedClient.budget] || selectedClient.budget}
										</p>
									</div>
								{/if}

								<!-- Message -->
								<div class="p-3 rounded-lg bg-dark-800/50">
									<div class="flex items-center gap-2 text-dark-400 mb-1">
										<span class="material-icons-round text-sm">message</span>
										<span class="text-xs font-medium">Mensaje</span>
									</div>
									<p class="text-white text-sm whitespace-pre-wrap">{selectedClient.message}</p>
								</div>

								<!-- Notes -->
								<div class="p-3 rounded-lg bg-dark-800/50">
									<div class="flex items-center justify-between mb-1">
										<div class="flex items-center gap-2 text-dark-400">
											<span class="material-icons-round text-sm">note</span>
											<span class="text-xs font-medium">Notas internas</span>
										</div>
										<button
											class="text-xs text-primary-400 hover:text-primary-300"
											onclick={() => {
												editingNotes = !editingNotes;
											}}
										>
											{editingNotes ? 'Cancelar' : 'Editar'}
										</button>
									</div>
									{#if editingNotes}
										<div class="mt-2" transition:slide={{ duration: 150 }}>
											<textarea
												bind:value={newNotes}
												class="input text-sm py-2 resize-none w-full"
												rows="3"
												placeholder="Agregar notas..."
											></textarea>
											<button
												class="mt-2 w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm"
												onclick={() => updateClientNotes(selectedClient!.id)}
											>
												Guardar notas
											</button>
										</div>
									{:else if selectedClient.notes}
										<p class="text-white text-sm whitespace-pre-wrap">{selectedClient.notes}</p>
									{:else}
										<p class="text-dark-500 text-sm italic">Sin notas</p>
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
												class="px-3 py-1 rounded-full text-xs border transition {selectedClient.status ===
												status
													? statusColors[status]
													: 'border-dark-700 text-dark-500 hover:border-dark-600 hover:text-dark-400'}"
												onclick={() => updateClientStatus(selectedClient!.id, status)}
											>
												{label}
											</button>
										{/each}
									</div>
								</div>

								<!-- Metadata -->
								<div class="p-3 rounded-lg bg-dark-800/50 text-xs text-dark-500">
									<p>Creado: {formatDateFull(selectedClient.created_at)}</p>
									{#if selectedClient.source}
										<p class="mt-1">Origen: {selectedClient.source}</p>
									{/if}
									{#if selectedClient.ip_country}
										<p class="mt-1">Pais: {selectedClient.ip_country}</p>
									{/if}
								</div>

								<!-- Actions -->
								<div class="flex gap-2">
									<a
										href="mailto:{selectedClient.email}"
										class="flex-1 btn-primary text-center text-sm py-2"
									>
										<span class="material-icons-round mr-1 text-sm">email</span>
										Contactar
									</a>
									<button
										class="px-4 py-2 bg-dark-800 hover:bg-red-500/20 text-dark-400 hover:text-red-400 rounded-lg transition text-sm"
										onclick={() => archiveClient(selectedClient!.id)}
										title="Archivar"
									>
										<span class="material-icons-round text-sm">archive</span>
									</button>
								</div>
							</div>
						</div>
					{:else}
						<div class="card text-center py-12 text-dark-500">
							<span class="material-icons-round text-4xl mb-2 opacity-50">touch_app</span>
							<p class="text-sm">Selecciona un lead para ver los detalles</p>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
