import { Component, inject } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { EventService } from '../../services/event-service';
import { AppEvent } from '../../interfaces/AppEvent';
import { EventForm } from '../event-form/event-form';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [EventForm, CommonModule],
  templateUrl: './event-create.html',
  styleUrls: ['./event-create.scss']
})
export class EventCreate {
  private eventService = inject(EventService);
  private router = inject(Router);

  public async onSaveEvent(formData: any) {
    console.warn('PARENT: RECEIVED DATA FROM CHILD!', formData);

    if (!formData) return;

    const newEvent: AppEvent = {
      title: formData.title,
      capacity: Number(formData.capacity),
      type: formData.type,
      startTime: new Date(formData.startTime),
      endTime: new Date(formData.endTime),
      countOfMembers: 0
    };

    try {
      console.log('PARENT: Sending to Firestore...', newEvent);
      await this.eventService.addEvent(newEvent);
      await this.router.navigate(['/']);
    } catch (err) {
      console.error('PARENT: Firestore Error:', err);
    }
  }
}
