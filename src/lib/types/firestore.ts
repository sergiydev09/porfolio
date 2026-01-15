import type { Timestamp } from 'firebase/firestore';

// Status types
export type ClientStatus = 'new' | 'contacted' | 'in_progress' | 'won' | 'lost' | 'spam';
export type MeetStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';

// Client (antes "Lead")
export interface Client {
	id: string;
	created_at: Timestamp;
	updated_at: Timestamp;
	name: string;
	email: string;
	company: string | null;
	services_interested: string[];
	budget: string | null;
	timeline: string | null;
	message: string;
	how_found: string | null;
	source: string | null;
	utm_campaign: string | null;
	utm_medium: string | null;
	landing_page: string | null;
	user_agent: string | null;
	ip_country: string | null;
	status: ClientStatus;
	notes: string | null;
	follow_up_date: Timestamp | null;
	estimated_value: number | null;
	archived: boolean;
}

export type ClientInsert = Omit<Client, 'id'>;

// Meet (antes "Meeting")
export interface Meet {
	id: string;
	created_at: Timestamp;
	updated_at: Timestamp;
	guest_name: string;
	guest_email: string;
	meeting_objective: string;
	start_time: Timestamp;
	end_time: Timestamp;
	timezone: string;
	meet_link: string | null;
	calendar_event_id: string | null;
	status: MeetStatus;
	cancelled_at: Timestamp | null;
	cancellation_reason: string | null;
	admin_notes: string | null;
}

export type MeetInsert = Omit<Meet, 'id'>;

// Page (antes "PageView")
export interface Page {
	id: string;
	created_at: Timestamp;
	page_path: string;
	session_id: string | null;
	visitor_id: string | null;
	referrer: string | null;
	user_agent: string | null;
	screen_size: string | null;
	country: string | null;
	duration_seconds: number | null;
}

export type PageInsert = Omit<Page, 'id'>;

// Helper para convertir Timestamp a Date
export function timestampToDate(ts: Timestamp | null): Date | null {
	return ts ? ts.toDate() : null;
}

// Helper para formatear fecha
export function formatDate(ts: Timestamp | null, locale = 'es-ES'): string {
	if (!ts) return '';
	return ts.toDate().toLocaleDateString(locale, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

// Helper para formatear fecha y hora
export function formatDateTime(ts: Timestamp | null, locale = 'es-ES'): string {
	if (!ts) return '';
	return ts.toDate().toLocaleString(locale, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}
