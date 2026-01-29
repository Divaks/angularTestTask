import {EventType} from "../types/EventType"

export interface Event {
  id: string;
  title: string;
  capacity: number;
  startTime: string;
  endTime: string;
  countOfMembers: number;
  type: EventType;
}
