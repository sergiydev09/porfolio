import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  generateTimeSlots,
  ALL_TIME_SLOTS,
  getMadridOffset,
  checkMeetingOverlap,
  getBlockedSlots,
  getAvailableSlots,
  isValidTimeSlot,
  validateBookingTime,
  isValidEmail,
} from './booking-utils';

describe('Time Slots Generation', () => {
  it('generates slots from 8:00 to 20:45 in 15-minute increments', () => {
    const slots = generateTimeSlots();

    // Should start at 8:00
    expect(slots[0]).toBe('08:00');

    // Should end at 20:45 (last slot before 21:00)
    expect(slots[slots.length - 1]).toBe('20:45');

    // 13 hours * 4 slots per hour = 52 slots
    expect(slots.length).toBe(52);
  });

  it('includes all 15-minute increments', () => {
    const slots = generateTimeSlots();

    // Check specific times exist
    expect(slots).toContain('08:00');
    expect(slots).toContain('08:15');
    expect(slots).toContain('08:30');
    expect(slots).toContain('08:45');
    expect(slots).toContain('12:00');
    expect(slots).toContain('15:30');
    expect(slots).toContain('20:00');
    expect(slots).toContain('20:45');
  });

  it('does not include times outside working hours', () => {
    const slots = generateTimeSlots();

    expect(slots).not.toContain('07:00');
    expect(slots).not.toContain('07:45');
    expect(slots).not.toContain('21:00');
    expect(slots).not.toContain('22:00');
  });
});

describe('Madrid Timezone Offset', () => {
  it('returns +1 for winter months (CET)', () => {
    // January 15, 2026
    const winterDate = new Date('2026-01-15T12:00:00Z');
    expect(getMadridOffset(winterDate)).toBe(1);

    // December 1, 2026
    const decemberDate = new Date('2026-12-01T12:00:00Z');
    expect(getMadridOffset(decemberDate)).toBe(1);
  });

  it('returns +2 for summer months (CEST)', () => {
    // July 15, 2026
    const summerDate = new Date('2026-07-15T12:00:00Z');
    expect(getMadridOffset(summerDate)).toBe(2);

    // August 1, 2026
    const augustDate = new Date('2026-08-01T12:00:00Z');
    expect(getMadridOffset(augustDate)).toBe(2);
  });

  it('handles DST transition correctly', () => {
    // DST transition is last Sunday of March/October
    // March 15 is clearly before DST
    const clearlyWinter = new Date('2026-03-15T12:00:00Z');
    expect(getMadridOffset(clearlyWinter)).toBe(1);

    // April 15 is clearly after DST start
    const clearlySummer = new Date('2026-04-15T12:00:00Z');
    expect(getMadridOffset(clearlySummer)).toBe(2);

    // November 1 is clearly after DST ends
    const backToWinter = new Date('2026-11-01T12:00:00Z');
    expect(getMadridOffset(backToWinter)).toBe(1);
  });
});

describe('Meeting Overlap Detection', () => {
  it('detects overlap when new meeting starts during existing meeting', () => {
    // Existing: 10:00-11:00
    const existingStart = new Date('2026-01-20T10:00:00+01:00');
    // New: 10:30-11:30
    const newStart = new Date('2026-01-20T10:30:00+01:00');
    const newEnd = new Date('2026-01-20T11:30:00+01:00');

    expect(checkMeetingOverlap(existingStart, newStart, newEnd)).toBe(true);
  });

  it('detects overlap when existing meeting starts during new meeting', () => {
    // Existing: 10:30-11:30
    const existingStart = new Date('2026-01-20T10:30:00+01:00');
    // New: 10:00-11:00
    const newStart = new Date('2026-01-20T10:00:00+01:00');
    const newEnd = new Date('2026-01-20T11:00:00+01:00');

    expect(checkMeetingOverlap(existingStart, newStart, newEnd)).toBe(true);
  });

  it('detects no overlap when meetings are consecutive', () => {
    // Existing: 10:00-11:00
    const existingStart = new Date('2026-01-20T10:00:00+01:00');
    // New: 11:00-12:00 (starts exactly when existing ends)
    const newStart = new Date('2026-01-20T11:00:00+01:00');
    const newEnd = new Date('2026-01-20T12:00:00+01:00');

    expect(checkMeetingOverlap(existingStart, newStart, newEnd)).toBe(false);
  });

  it('detects no overlap when meetings are far apart', () => {
    // Existing: 09:00-10:00
    const existingStart = new Date('2026-01-20T09:00:00+01:00');
    // New: 14:00-15:00
    const newStart = new Date('2026-01-20T14:00:00+01:00');
    const newEnd = new Date('2026-01-20T15:00:00+01:00');

    expect(checkMeetingOverlap(existingStart, newStart, newEnd)).toBe(false);
  });

  it('detects overlap with 15-minute slot', () => {
    // Existing: 10:15-11:15
    const existingStart = new Date('2026-01-20T10:15:00+01:00');
    // New: 11:00-12:00 (overlaps by 15 minutes)
    const newStart = new Date('2026-01-20T11:00:00+01:00');
    const newEnd = new Date('2026-01-20T12:00:00+01:00');

    expect(checkMeetingOverlap(existingStart, newStart, newEnd)).toBe(true);
  });
});

describe('Blocked Slots Calculation', () => {
  it('blocks 4 consecutive slots for a 1-hour meeting', () => {
    const meetings = [new Date('2026-01-20T10:00:00+01:00')];
    const blocked = getBlockedSlots(meetings);

    expect(blocked.has('10:00')).toBe(true);
    expect(blocked.has('10:15')).toBe(true);
    expect(blocked.has('10:30')).toBe(true);
    expect(blocked.has('10:45')).toBe(true);
    expect(blocked.has('11:00')).toBe(false); // Next meeting can start here
  });

  it('handles meeting starting at non-hour time', () => {
    const meetings = [new Date('2026-01-20T10:30:00+01:00')];
    const blocked = getBlockedSlots(meetings);

    expect(blocked.has('10:30')).toBe(true);
    expect(blocked.has('10:45')).toBe(true);
    expect(blocked.has('11:00')).toBe(true);
    expect(blocked.has('11:15')).toBe(true);
    expect(blocked.has('11:30')).toBe(false);
  });

  it('handles multiple meetings', () => {
    const meetings = [
      new Date('2026-01-20T09:00:00+01:00'),
      new Date('2026-01-20T14:00:00+01:00'),
    ];
    const blocked = getBlockedSlots(meetings);

    // First meeting blocks 09:00-09:45
    expect(blocked.has('09:00')).toBe(true);
    expect(blocked.has('09:45')).toBe(true);
    expect(blocked.has('10:00')).toBe(false);

    // Second meeting blocks 14:00-14:45
    expect(blocked.has('14:00')).toBe(true);
    expect(blocked.has('14:45')).toBe(true);
    expect(blocked.has('15:00')).toBe(false);
  });
});

describe('Available Slots', () => {
  it('returns all slots when no meetings exist', () => {
    const available = getAvailableSlots([]);
    expect(available.length).toBe(52); // All 52 slots available
  });

  it('excludes blocked slots from available list', () => {
    const meetings = [new Date('2026-01-20T10:00:00+01:00')];
    const available = getAvailableSlots(meetings);

    expect(available).not.toContain('10:00');
    expect(available).not.toContain('10:15');
    expect(available).not.toContain('10:30');
    expect(available).not.toContain('10:45');
    expect(available).toContain('09:00');
    expect(available).toContain('11:00');
  });
});

describe('Time Slot Validation', () => {
  it('accepts valid 15-minute slots', () => {
    expect(isValidTimeSlot('08:00')).toBe(true);
    expect(isValidTimeSlot('08:15')).toBe(true);
    expect(isValidTimeSlot('08:30')).toBe(true);
    expect(isValidTimeSlot('08:45')).toBe(true);
    expect(isValidTimeSlot('20:00')).toBe(true);
    expect(isValidTimeSlot('20:45')).toBe(true);
  });

  it('rejects times outside working hours', () => {
    expect(isValidTimeSlot('07:00')).toBe(false);
    expect(isValidTimeSlot('07:45')).toBe(false);
    expect(isValidTimeSlot('21:00')).toBe(false);
    expect(isValidTimeSlot('22:00')).toBe(false);
  });

  it('rejects invalid minute values', () => {
    expect(isValidTimeSlot('10:05')).toBe(false);
    expect(isValidTimeSlot('10:10')).toBe(false);
    expect(isValidTimeSlot('10:20')).toBe(false);
    expect(isValidTimeSlot('10:50')).toBe(false);
  });
});

describe('Booking Time Validation', () => {
  beforeEach(() => {
    // Mock current date to January 16, 2026, 10:00 AM Madrid time
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-16T09:00:00Z')); // 10:00 Madrid (CET)
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('accepts valid future booking', () => {
    const result = validateBookingTime('2026-01-20', '10:00', []);
    expect(result.valid).toBe(true);
  });

  it('accepts booking on weekends', () => {
    // January 17, 2026 is a Saturday
    const result = validateBookingTime('2026-01-17', '10:00', []);
    expect(result.valid).toBe(true);

    // January 18, 2026 is a Sunday
    const result2 = validateBookingTime('2026-01-18', '14:00', []);
    expect(result2.valid).toBe(true);
  });

  it('accepts 15-minute slots', () => {
    expect(validateBookingTime('2026-01-20', '10:15', []).valid).toBe(true);
    expect(validateBookingTime('2026-01-20', '10:30', []).valid).toBe(true);
    expect(validateBookingTime('2026-01-20', '10:45', []).valid).toBe(true);
  });

  it('rejects past dates', () => {
    const result = validateBookingTime('2026-01-10', '10:00', []);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('past');
  });

  it('rejects times outside working hours', () => {
    const result = validateBookingTime('2026-01-20', '07:00', []);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('outside working hours');
  });

  it('rejects conflicting times', () => {
    const existingMeetings = [new Date('2026-01-20T10:00:00+01:00')];
    const result = validateBookingTime('2026-01-20', '10:00', existingMeetings);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('conflicts');
  });

  it('rejects overlapping times', () => {
    const existingMeetings = [new Date('2026-01-20T10:00:00+01:00')];
    // 10:30 would overlap with meeting 10:00-11:00
    const result = validateBookingTime('2026-01-20', '10:30', existingMeetings);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('conflicts');
  });

  it('accepts time right after existing meeting ends', () => {
    const existingMeetings = [new Date('2026-01-20T10:00:00+01:00')];
    // 11:00 is exactly when the 10:00 meeting ends
    const result = validateBookingTime('2026-01-20', '11:00', existingMeetings);
    expect(result.valid).toBe(true);
  });
});

describe('Email Validation', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    expect(isValidEmail('user+tag@example.org')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('invalid@')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('user@domain')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});
