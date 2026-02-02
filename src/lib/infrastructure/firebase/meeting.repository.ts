import type { MeetingRepository } from '../../core/repositories/meeting.repository';
import type { Meeting, BookingData } from '../../core/entities/meeting';
import { getFirebaseDb } from '$lib/firebase/client';
import { COLLECTIONS } from '$lib/firebase/collections';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    Timestamp,
    serverTimestamp,
    type Firestore
} from 'firebase/firestore';

export class FirebaseMeetingRepository implements MeetingRepository {
    private get db(): Firestore | null {
        return getFirebaseDb();
    }

    subscribeToMeetings(
        startOfDay: Date,
        endOfDay: Date,
        callback: (meetings: Meeting[]) => void,
        onError: (error: Error) => void
    ): () => void {
        const db = this.db;
        if (!db) {
            onError(new Error('Firebase not initialized'));
            return () => { };
        }

        const meetsQuery = query(
            collection(db, COLLECTIONS.MEETS),
            where('start_time', '>=', Timestamp.fromDate(startOfDay)),
            where('start_time', '<=', Timestamp.fromDate(endOfDay))
        );

        return onSnapshot(
            meetsQuery,
            (snapshot) => {
                const meetings = snapshot.docs
                    .map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            ...data,
                            // Convert Firestore Timestamps to JS Dates
                            start_time: (data.start_time as Timestamp).toDate(),
                            end_time: (data.end_time as Timestamp).toDate(),
                            cancelled_at: data.cancelled_at ? (data.cancelled_at as Timestamp).toDate() : null,
                            created_at: data.created_at ? (data.created_at as Timestamp).toDate() : undefined,
                            updated_at: data.updated_at ? (data.updated_at as Timestamp).toDate() : undefined,
                        } as Meeting;
                    })
                    .filter((m) => m.status === 'pending' || m.status === 'confirmed');

                callback(meetings);
            },
            (error) => {
                console.error('Error loading meetings:', error);
                onError(error);
            }
        );
    }

    async createMeeting(data: BookingData): Promise<void> {
        const db = this.db;
        if (!db) throw new Error('Firebase connection failed');

        // Note: The original code had logic for Google Calendar API call here.
        // In a strict Clean Arch, that might belong in a Service or a separate "CalendarProvider" adapter.
        // For now, we will focus on the Firestore persistence part as requested, 
        // but to keep the feature parity, we must perform the API call.
        // Ideally, the Service should orchestrate: 1. Create Calendar Event, 2. Save to DB.
        // For this refactor step, I will keep the API call logic in the Repository 
        // OR move it to the Service layer (Cleaner). 
        // Let's decide to keep persistence logic ONLY here. 
        // The API call logic was inside submitBooking in the component.
        // I will move the API call logic to the SERVICE layer in the next step, 
        // passed into this repository or handled before calling this.

        // Wait, looking at the previous code, the API call returned a meetLink which was saved to DB.
        // So the Service should call API -> get link -> call Repository.createMeeting(data + link).
        // I will update BookingData in the entity to optional include meetLink? 
        // Or better, let's stick to the current implementation of just saving to DB here.
        // The component was doing the fetch. I will move that fetch to the Service.

        await addDoc(collection(db, COLLECTIONS.MEETS), {
            guest_name: data.guestName,
            guest_email: data.guestEmail,
            meeting_objective: data.meetingObjective,
            start_time: Timestamp.fromDate(data.startTime),
            end_time: Timestamp.fromDate(data.endTime),
            timezone: 'Europe/Madrid',
            // fields that will be filled by the service/logic before or defaults
            meet_link: null, // This implies the service needs to update it later or we accept it as param
            calendar_event_id: null,
            status: 'confirmed', // as per original code
            cancelled_at: null,
            cancellation_reason: null,
            admin_notes: null,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
        });
    }

    // Extended method to support the full flow including the properties coming from the Calendar API
    // We can overload or create a specific method.
    async createMeetingWithDetails(
        data: BookingData,
        meetLink: string | null,
        calendarEventId: string | null
    ): Promise<void> {
        const db = this.db;
        if (!db) throw new Error('Firebase connection failed');

        await addDoc(collection(db, COLLECTIONS.MEETS), {
            guest_name: data.guestName,
            guest_email: data.guestEmail,
            meeting_objective: data.meetingObjective,
            start_time: Timestamp.fromDate(data.startTime),
            end_time: Timestamp.fromDate(data.endTime),
            timezone: 'Europe/Madrid',
            meet_link: meetLink,
            calendar_event_id: calendarEventId,
            status: 'confirmed',
            cancelled_at: null,
            cancellation_reason: null,
            admin_notes: null,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
        });
    }
}
