import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getFirebaseDb } from '$lib/firebase/client';
import { COLLECTIONS } from '$lib/firebase/collections';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Basic validation
		if (!data.name || !data.email || !data.message) {
			return json({ error: 'Campos requeridos faltantes' }, { status: 400 });
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return json({ error: 'Email invalido' }, { status: 400 });
		}

		const db = getFirebaseDb();
		if (!db) {
			console.error('Firebase not initialized');
			return json({ error: 'Error de configuracion' }, { status: 500 });
		}

		await addDoc(collection(db, COLLECTIONS.CLIENTS), {
			name: data.name,
			email: data.email,
			company: data.company || null,
			services_interested: data.service ? [data.service] : [],
			budget: data.budget || null,
			message: data.message,
			source: request.headers.get('referer') || '/',
			user_agent: request.headers.get('user-agent') || null,
			status: 'new',
			archived: false,
			created_at: serverTimestamp(),
			updated_at: serverTimestamp()
		});

		return json({ success: true });
	} catch (error) {
		console.error('Contact form error:', error);
		return json({ error: 'Error interno del servidor' }, { status: 500 });
	}
};
