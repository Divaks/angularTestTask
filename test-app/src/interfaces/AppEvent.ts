import {EventType} from "../types/EventType"

export interface AppEvent {
  id?: string;
  title: string;
  capacity: number;
  startTime: string;
  endTime: string;
  countOfMembers: number;
  type: EventType;
}
