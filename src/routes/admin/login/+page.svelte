<script lang="ts">
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { getFirebaseAuth } from '$lib/firebase/client';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let email = $state('');
	let password = $state('');
	let error = $state<string | null>(null);
	let loading = $state(false);

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = null;
		loading = true;

		const auth = getFirebaseAuth();
		if (!auth) {
			error = 'Error de conexion con el servidor';
			loading = false;
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, email, password);
			goto('/admin');
		} catch (err: unknown) {
			const firebaseError = err as { code?: string; message?: string };
			error =
				firebaseError.code === 'auth/invalid-credential'
					? 'Email o contrasena incorrectos'
					: firebaseError.message || 'Error de autenticacion';
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login | Sergiy Alonso</title>
	<meta name="robots" content="noindex, nofollow" />
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-dark-950 flex items-center justify-center px-4">
	<div class="w-full max-w-sm" in:fly={{ y: 20, duration: 400 }}>
		<!-- Logo/Header -->
		<div class="text-center mb-8">
			<div
				class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20"
			>
				<span class="material-icons-round text-white text-3xl">admin_panel_settings</span>
			</div>
			<h1 class="text-2xl font-bold text-white">Admin Dashboard</h1>
			<p class="text-dark-400 text-sm mt-1">Acceso restringido</p>
		</div>

		<!-- Login Form -->
		<form onsubmit={handleLogin} class="card space-y-4">
			<div>
				<label for="email" class="label">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					class="input"
					placeholder="tu@email.com"
					required
					disabled={loading}
				/>
			</div>

			<div>
				<label for="password" class="label">Contrasena</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					class="input"
					placeholder="********"
					required
					disabled={loading}
				/>
			</div>

			{#if error}
				<div
					class="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2"
					in:fly={{ y: -10, duration: 200 }}
				>
					<span class="material-icons-round text-sm">error</span>
					{error}
				</div>
			{/if}

			<button type="submit" class="w-full btn-primary" disabled={loading}>
				{#if loading}
					<span class="animate-spin mr-2">
						<span class="material-icons-round text-sm">refresh</span>
					</span>
					Iniciando sesion...
				{:else}
					Iniciar sesion
					<span class="material-icons-round ml-2 text-sm">login</span>
				{/if}
			</button>
		</form>

		<!-- Back link -->
		<div class="text-center mt-6">
			<a
				href="/"
				class="text-dark-400 hover:text-white text-sm transition flex items-center justify-center gap-1"
			>
				<span class="material-icons-round text-sm">arrow_back</span>
				Volver al sitio
			</a>
		</div>
	</div>
</div>
