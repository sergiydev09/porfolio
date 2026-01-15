// Nombres de colecciones Firestore centralizados
export const COLLECTIONS = {
	CLIENTS: 'clients',
	MEETS: 'meets',
	PAGES: 'pages'
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
