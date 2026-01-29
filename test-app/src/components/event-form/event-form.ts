import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { EventType } from '../../types/EventType';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, KeyValuePipe],
  templateUrl: './event-form.html',
  styleUrls: ['./event-form.scss']
})
export class EventForm {
  private fb = inject(FormBuilder);
  eEventType = EventType;

  @Output() save = new EventEmitter<any>();

  submit() {
    if (this.form.valid) {
      console.log('CHILD: Sending via SAVE output...');
      this.save.emit(this.form.value);
    }
  }
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    type: [null as EventType | null, Validators.required],
    capacity: [10, [Validators.required, Validators.min(1)]],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required]
  });
}
