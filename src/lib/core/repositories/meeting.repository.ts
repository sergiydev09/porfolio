import type { Meeting, BookingData } from '../entities/meeting';

export interface MeetingRepository {
    /**
     * Subscribe to meetings for a specific date range.
     * Returns an unsubscribe function.
     */
    subscribeToMeetings(
        startOfDay: Date,
        endOfDay: Date,
        callback: (meetings: Meeting[]) => void,
        onError: (error: Error) => void
    ): () => void;

    /**
     * Create a new meeting.
     */
    createMeeting(data: BookingData): Promise<void>;
}
