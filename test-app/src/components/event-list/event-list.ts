import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event-service';
import { AppEvent } from '../../interfaces/AppEvent'
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [
    RouterLink
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList {
  events: AppEvent[] = [];

  constructor(private eventService: EventService) {}

  onAdd(eventToAdd: AppEvent){
    this.eventService.addEvent(eventToAdd);
  }

  onDelete(id: string) {
    this.eventService.deleteEvent(id);
  }
}
