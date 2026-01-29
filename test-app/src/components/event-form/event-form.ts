import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event-service';
import {EventType} from '../../types/EventType';
import {AppEvent} from '../../interfaces/AppEvent';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>{{ isEditMode ? 'Редагувати' : 'Створити' }} подію</h2>
    <form [formGroup]="eventForm" (ngSubmit)="onSubmit()">
      <button type="submit">{{ isEditMode ? 'Оновити' : 'Зберегти' }}</button>
    </form>
  `
})
export class EventForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);

  eventForm = this.fb.group({
    title: ['', Validators.required],
    capacity: [0, [Validators.required, Validators.min(1)]],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    countOfMembers: [0, Validators.required],
    type: [EventType.Free, Validators.required]
  });

  isEditMode = false;
  eventId: string | null = null;

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.isEditMode = true;
      this.loadEventData(this.eventId);
    }
  }

  loadEventData(id: string) {
    this.eventService.getEventById(id).subscribe(event => {
      if (event) this.eventForm.patchValue(event);
    });
  }

  onSubmit() {
    if (this.eventForm.invalid) return;

    const data = this.eventForm.getRawValue() as AppEvent;

    if (this.isEditMode && this.eventId) {
      this.eventService.updateEvent(this.eventId, data)
        .then(() => this.router.navigate(['/events']));
    } else {
      this.eventService.addEvent(data)
        .then(() => this.router.navigate(['/events']));
    }
  }
}
