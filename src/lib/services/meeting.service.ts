
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
        this.validateBooking(data);

        let meetLink: string | null = null;
        let calendarEventId: string | null = null;
        let calendarSuccess = false;

        try {
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
                calendarSuccess = true;
            } else {
                console.warn("Calendar API failed, saving as pending for manual review");
            }
        } catch (error) {
            console.warn("Calendar API error, saving as pending:", error);
        }

        // Status depends on Calendar API success
        const status = calendarSuccess ? 'confirmed' : 'pending';

        if ('createMeetingWithDetails' in this.repository) {
            await (this.repository as any).createMeetingWithDetails(data, meetLink, calendarEventId, status);
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
