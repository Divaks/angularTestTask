import { Component, EventEmitter, inject, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { EventType } from '../../types/EventType';
import { AppEvent } from '../../interfaces/AppEvent';
import {dateRangeValidator} from '../../validators/date.validator';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink ],
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
    price: [null as number | null],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
  }, {
    validators: [dateRangeValidator]
  });

  ngOnInit() {
    this.setupTypeSubscription();

    if (this.initialData) {
      this.patchFormValues(this.initialData);
    }
  }

  private setupTypeSubscription() {
    this.form.get('type')?.valueChanges.subscribe(type => {
      const priceControl = this.form.get('price');

      if (type === 'PAID') {
        priceControl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        priceControl?.clearValidators();
        priceControl?.setValue(null);
      }

      priceControl?.updateValueAndValidity();
    });
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
      price: data.price,
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
