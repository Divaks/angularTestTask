import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event-service';
import { AppEvent } from '../../interfaces/AppEvent'

@Component({
  selector: 'app-event-list',
  imports: [],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList {
  events: AppEvent[] = [];

  constructor(private eventService: EventService) {}

  onAdd(eventToAdd: AppEvent){
    this.eventService.addEvent(eventToAdd);
  }

  onDelete(id: number) {
    this.eventService.deleteEvent(id);
  }
}
