import { FirebaseMeetingRepository } from '$lib/infrastructure/firebase/meeting.repository';

// Singleton instance
export const meetingRepository = new FirebaseMeetingRepository();
