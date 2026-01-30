import { Component, EventEmitter, inject, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { EventType } from '../../types/EventType';
import { AppEvent } from '../../interfaces/AppEvent';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, KeyValuePipe,
    MatInputModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,],
  templateUrl: './event-form.html',
  styleUrls: ['./event-form.scss']
})
export class EventForm implements OnChanges, OnInit {
  private fb = inject(FormBuilder);
  eEventType = EventType;

  @Input() initialData: AppEvent | null = null;
  @Output() formSubmit = new EventEmitter<any>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    type: [null as EventType | null, Validators.required],
    capacity: [10, [Validators.required, Validators.min(1)]],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required]
  });

  ngOnInit() {
    if (this.initialData) {
      this.patchFormValues(this.initialData);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData']?.currentValue) {
      this.patchFormValues(changes['initialData'].currentValue);
    }
  }

  private formatDate(date: any): string {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    if (isNaN(d.getTime())) return '';
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }

  private patchFormValues(data: AppEvent) {
    this.form.patchValue({
      title: data.title,
      type: data.type,
      capacity: data.capacity,
      startTime: this.formatDate(data.startTime),
      endTime: this.formatDate(data.endTime)
    });
    this.form.markAsDirty();
    this.form.updateValueAndValidity();
  }

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }
}
