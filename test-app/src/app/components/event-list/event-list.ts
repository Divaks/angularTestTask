import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { EventService } from '../../services/event-service';
import { AppEvent } from '../../interfaces/AppEvent';
import { Observable, combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.scss']
})
export class EventList {
  private eventService = inject(EventService);
  private fb = inject(FormBuilder);

  filterForm = this.fb.group({
    status: ['Всі'],
    type: ['Всі'],
    occupancy: ['Всі']
  });

  events$: Observable<AppEvent[]> = this.eventService.getEvents();

  filteredEvents$: Observable<AppEvent[]> = combineLatest([
    this.events$,
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.value))
  ]).pipe(
    map(([events, filters]) => {
      return events.filter(event => {
        const matchStatus = filters.status === 'Всі' || this.getEventStatus(event) === filters.status;
        const matchType = filters.type === 'Всі' || event.type === filters.type;

        const occupancy = this.getOccupancy(event);
        let matchOccupancy = true;
        if (filters.occupancy === 'Вільні') matchOccupancy = occupancy < 100;
        if (filters.occupancy === 'Повні') matchOccupancy = occupancy >= 100;

        return matchStatus && matchType && matchOccupancy;
      });
    })
  );

  getOccupancy(event: AppEvent): number {
    if (!event.capacity || event.capacity <= 0) return 0;
    return Math.round((event.countOfMembers / event.capacity) * 100);
  }

  getEventStatus(event: AppEvent): string {
    const now = new Date();
    const start = event.startTime?.toDate ? event.startTime.toDate() : new Date(event.startTime);
    const end = event.endTime?.toDate ? event.endTime.toDate() : new Date(event.endTime);

    if (now < start) return 'Ще не почалась';
    if (now >= start && now <= end) return 'Активна';
    return 'Закінчилась';
  }

  onDelete(id: string) {
    if (confirm('Ви впевнені?')) {
      this.eventService.deleteEvent(id).catch(err => console.error(err));
    }
  }

  async onRegister(event: AppEvent) {
    const occupancy = this.getOccupancy(event);

    if (occupancy >= 100) {
      alert('На жаль, вільних місць більше немає!');
      return;
    }

    try {
      await this.eventService.registerForEvent(event.id!);
    } catch (err) {
      console.error('Помилка реєстрації:', err);
    }
  }
}
