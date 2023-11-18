import type { Timestamp } from 'firebase/firestore';

export interface Frequency {
  recurring: boolean;
  type: 'specificDays' | 'custom' | null;
  daysOfWeek: Array<number> | null; // numbers 0-6, 0 - sunday, 6 = saturday
  unit: 'day' | 'week' | 'month';
  interval: number | null; // interval * unit
  startDate: Timestamp | null;
  endDate: Timestamp | null;
}
