<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getFirebaseAuth } from '$lib/firebase/client';
	import { onAuthStateChanged, signOut, type User } from 'firebase/auth';

	let { children } = $props();

	const ADMIN_EMAIL = 'sergiy.alonso@gmail.com';

	let user = $state<User | null>(null);
	let loading = $state(true);

	// Don't show layout on login page
	const isLoginPage = $derived($page.url.pathname === '/admin/login');

	onMount(() => {
		const auth = getFirebaseAuth();
		if (!auth) {
			loading = false;
			if (!isLoginPage) goto('/admin/login');
			return;
		}

		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			user = firebaseUser;
			loading = false;

			// Redirect if not admin
			if (!isLoginPage && (!firebaseUser || firebaseUser.email !== ADMIN_EMAIL)) {
				goto('/admin/login');
			}

			// Redirect to dashboard if already logged in on login page
			if (isLoginPage && firebaseUser && firebaseUser.email === ADMIN_EMAIL) {
				goto('/admin');
			}
		});

		return () => unsubscribe();
	});

	async function handleLogout() {
		const auth = getFirebaseAuth();
		if (auth) {
			await signOut(auth);
		}
		goto('/admin/login');
	}
</script>

{#if isLoginPage}
	{@render children()}
{:else if loading}
	<div class="min-h-screen bg-dark-950 flex items-center justify-center">
		<span class="animate-spin text-primary-500">
			<span class="material-icons-round text-3xl">refresh</span>
		</span>
	</div>
{:else if user && user.email === ADMIN_EMAIL}
	<div class="min-h-screen bg-dark-950">
		<!-- Top Navigation -->
		<nav class="border-b border-dark-800 bg-dark-900/50 backdrop-blur-md sticky top-0 z-50">
			<div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
				<div class="flex items-center gap-4">
					<a href="/admin" class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center"
						>
							<span class="material-icons-round text-white text-sm">dashboard</span>
						</div>
						<span class="font-bold text-white">Admin</span>
					</a>
					<div class="hidden sm:flex items-center gap-1 text-sm">
						<a
							href="/admin"
							class="px-3 py-1.5 rounded-lg transition {$page.url.pathname === '/admin'
								? 'bg-dark-800 text-white'
								: 'text-dark-400 hover:text-white'}"
						>
							Dashboard
						</a>
						<a
							href="/admin/meetings"
							class="px-3 py-1.5 rounded-lg transition {$page.url.pathname === '/admin/meetings'
								? 'bg-dark-800 text-white'
								: 'text-dark-400 hover:text-white'}"
						>
							Reuniones
						</a>
						<a
							href="/admin/leads"
							class="px-3 py-1.5 rounded-lg transition {$page.url.pathname === '/admin/leads'
								? 'bg-dark-800 text-white'
								: 'text-dark-400 hover:text-white'}"
						>
							Leads
						</a>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<a
						href="/"
						class="text-dark-400 hover:text-white text-sm transition flex items-center gap-1"
					>
						<span class="material-icons-round text-sm">open_in_new</span>
						<span class="hidden sm:inline">Ver sitio</span>
					</a>
					<button
						onclick={handleLogout}
						class="px-3 py-1.5 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg transition flex items-center gap-1 text-sm"
					>
						<span class="material-icons-round text-sm">logout</span>
						<span class="hidden sm:inline">Salir</span>
					</button>
				</div>
			</div>
		</nav>

		<!-- Page Content -->
		{@render children()}
	</div>
{/if}
