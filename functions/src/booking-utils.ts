/**
 * Booking utilities for time slot management
 * These functions are extracted for testing purposes
 */

// Generate all available time slots (8:00-20:00 in 15-minute increments)
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }
  return slots;
}

export const ALL_TIME_SLOTS = generateTimeSlots();

// Get Madrid timezone offset (UTC+1 in winter, UTC+2 in summer)
export function getMadridOffset(date: Date): number {
  const year = date.getFullYear();

  // Last Sunday of March at 2:00 AM (start of DST)
  const dstStart = new Date(year, 2, 31);
  while (dstStart.getDay() !== 0) dstStart.setDate(dstStart.getDate() - 1);
  dstStart.setUTCHours(1, 0, 0, 0); // 2:00 AM Madrid = 1:00 UTC

  // Last Sunday of October at 3:00 AM (end of DST)
  const dstEnd = new Date(year, 9, 31);
  while (dstEnd.getDay() !== 0) dstEnd.setDate(dstEnd.getDate() - 1);
  dstEnd.setUTCHours(1, 0, 0, 0); // 3:00 AM Madrid = 1:00 UTC

  // Check if date is in DST (summer time)
  if (date >= dstStart && date < dstEnd) {
    return 2; // CEST (summer) = UTC+2
  }
  return 1; // CET (winter) = UTC+1
}

// Check if two meetings overlap (both are 1 hour long)
export function checkMeetingOverlap(
  existingStart: Date,
  newStart: Date,
  newEnd: Date
): boolean {
  const existingStartTime = existingStart.getTime();
  const existingEndTime = existingStartTime + 60 * 60 * 1000; // 1 hour later
  const newStartTime = newStart.getTime();
  const newEndTime = newEnd.getTime();

  // Check for overlap: existing starts before new ends AND existing ends after new starts
  return existingStartTime < newEndTime && existingEndTime > newStartTime;
}

// Get blocked time slots from a list of existing meetings
export function getBlockedSlots(meetings: Date[]): Set<string> {
  const bookedSlots = new Set<string>();

  meetings.forEach(startTime => {
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();

    // Mark all 15-min slots during the 1-hour meeting as booked
    for (let offset = 0; offset < 60; offset += 15) {
      const totalMinutes = startHour * 60 + startMinute + offset;
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;
      bookedSlots.add(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  });

  return bookedSlots;
}

// Get available slots for a day given existing meetings
export function getAvailableSlots(existingMeetings: Date[]): string[] {
  const blockedSlots = getBlockedSlots(existingMeetings);
  return ALL_TIME_SLOTS.filter(slot => !blockedSlots.has(slot));
}

// Validate time slot is within working hours
export function isValidTimeSlot(time: string): boolean {
  return ALL_TIME_SLOTS.includes(time);
}

// Validate booking data
export interface BookingValidation {
  valid: boolean;
  error?: string;
}

export function validateBookingTime(
  date: string,
  time: string,
  existingMeetings: Date[] = []
): BookingValidation {
  // Validate time format
  if (!/^\d{2}:\d{2}$/.test(time)) {
    return { valid: false, error: 'Invalid time format. Use HH:MM' };
  }

  // Validate time is within working hours
  if (!isValidTimeSlot(time)) {
    return { valid: false, error: `Time ${time} is outside working hours (8:00-21:00)` };
  }

  // Get Madrid offset for proper timezone handling
  const tempDate = new Date(`${date}T12:00:00Z`);
  const madridOffset = getMadridOffset(tempDate);
  const offsetStr = madridOffset === 1 ? '+01:00' : '+02:00';

  // Parse date with Madrid timezone
  const [hours, minutes] = time.split(':').map(Number);
  const startDateTime = new Date(`${date}T${time}:00${offsetStr}`);
  const endDateTime = new Date(`${date}T${(hours + 1).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00${offsetStr}`);

  // Validate date is not in the past
  if (startDateTime < new Date()) {
    return { valid: false, error: 'Cannot book meetings in the past' };
  }

  // Check for conflicts with existing meetings
  for (const existingStart of existingMeetings) {
    if (checkMeetingOverlap(existingStart, startDateTime, endDateTime)) {
      return { valid: false, error: 'Time slot conflicts with an existing meeting' };
    }
  }

  return { valid: true };
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
