
export interface Meeting {
    id?: string;
    guest_name: string;
    guest_email: string;
    meeting_objective: string;
    start_time: Date;
    end_time: Date;
    timezone: string;
    meet_link?: string | null;
    calendar_event_id?: string | null;
    status: 'pending' | 'confirmed' | 'cancelled';
    cancelled_at?: Date | null;
    cancellation_reason?: string | null;
    admin_notes?: string | null;
    created_at?: Date;
    updated_at?: Date;
}

export interface BookingData {
    guestName: string;
    guestEmail: string;
    meetingObjective: string;
    startTime: Date;
    endTime: Date;
}
