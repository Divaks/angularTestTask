import { Timestamp } from '@angular/fire/firestore';
import { EventType } from '../types/EventType';

export interface AppEvent {
  id?: string;
  title: string;
  capacity: number;
  type: EventType;
  startTime: Timestamp | Date | any;
  endTime: Timestamp | Date | any;
  countOfMembers: number;
  price?: number | null;
}
