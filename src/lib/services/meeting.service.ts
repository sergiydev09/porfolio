
import type { BookingData, Meeting } from '$lib/core/entities/meeting';
import type { MeetingRepository } from '$lib/core/repositories/meeting.repository';
import { meetingRepository } from './container';

export class MeetingService {
    constructor(private repository: MeetingRepository = meetingRepository) { }

    subscribeToMeetings(
        date: Date,
        callback: (meetings: Meeting[]) => void,
        onError: (error: Error) => void
    ): () => void {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return this.repository.subscribeToMeetings(startOfDay, endOfDay, callback, onError);
    }

    async bookMeeting(data: BookingData, language: string = 'es'): Promise<void> {
        // 1. Business Validation (could be moved to Domain Entities validation method)
        this.validateBooking(data);

        let meetLink: string | null = null;
        let calendarEventId: string | null = null;

        // 2. Call Google Calendar API (External Service)
        // Ideally this should be behind a CalendarService interface, but for now we keep the fetch here
        // or we can move it to a dedicated file. Keeping it here to mirror original logic but cleaner.
        try {
            // We need to recreate the ISO strings expected by the cloud function
            const calendarResponse = await fetch(
                "https://europe-west1-savaitech.cloudfunctions.net/createCalendarEvent",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        guestName: data.guestName,
                        guestEmail: data.guestEmail,
                        meetingObjective: data.meetingObjective,
                        startTime: data.startTime.toISOString(),
                        endTime: data.endTime.toISOString(),
                        language: language,
                    }),
                },
            );

            if (calendarResponse.ok) {
                const calendarData = await calendarResponse.json();
                meetLink = calendarData.meetLink;
                calendarEventId = calendarData.eventId;
            } else {
                console.warn("Calendar API failed, continuing without Meet link");
            }
        } catch (error) {
            console.warn("Calendar API error:", error);
        }

        // 3. Persist to Database via Repository
        // We cast to any to access the specific method we created in Firebase impl
        // Or better, we strictly use the interface. 
        // Our interface only has createMeeting(data). 
        // We need to update the interface to support these extra fields or update the BookingData entity.
        // Let's assume we want to stick to the interface. 
        // For this immediate refactor, I'll allow the cast or better yet:
        // Update the Repository to accept optional metadata?

        // Actually, let's use the createMeetingWithDetails if we can, or just call createMeeting 
        // implementation in FirebaseRepo needs to handle this.

        // To do it clean: The interface createMeeting should accept a fuller object.
        // But let's use the explicit cast for the specific feature of "Saving with Meet Link" 
        // if we want to keep the interface generic for "BookingData".

        // A better approach for this file:
        if ('createMeetingWithDetails' in this.repository) {
            await (this.repository as any).createMeetingWithDetails(data, meetLink, calendarEventId);
        } else {
            await this.repository.createMeeting(data);
        }
    }

    private validateBooking(data: BookingData) {
        if (!data.guestName || !data.guestEmail || !data.meetingObjective) {
            throw new Error('missing_fields');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.guestEmail)) {
            throw new Error('invalid_email');
        }
    }
}

export const meetingService = new MeetingService();
