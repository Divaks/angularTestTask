import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event-service';
import { AppEvent } from '../../interfaces/AppEvent';
import { EventForm } from '../event-form/event-form';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [EventForm, AsyncPipe],
  template: `
    <div class="create-container">
      <h1>Редагувати подію</h1>
      @if (event$ | async; as eventData) {
        <app-event-form
          [initialData]="eventData"
          (formSubmit)="handleUpdate($event)">
        </app-event-form>
      } @else {
        <p>Завантаження...</p>
      }
    </div>
  `,
  styleUrls: ['../event-create/event-create.scss']
})
export class EventEdit implements OnInit {
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  event$: Observable<AppEvent> | undefined;
  private eventId: string | null = null;

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.event$ = this.eventService.getEventById(this.eventId);
    }
  }

  async handleUpdate(formData: any) {
    if (!this.eventId) return;

    const updatedEvent: Partial<AppEvent> = {
      title: formData.title,
      capacity: Number(formData.capacity),
      type: formData.type,
      startTime: new Date(formData.startTime),
      endTime: new Date(formData.endTime),
      price: formData.type === 'PAID' ? Number(formData.price) : null
    };

    try {
      await this.eventService.updateEvent(this.eventId, updatedEvent);
      this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
    }
  }
}
