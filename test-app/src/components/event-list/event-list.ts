import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event-service';
import { Observable } from 'rxjs';
import { AppEvent } from '../../interfaces/AppEvent';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.scss']
})
export class EventList {
  private eventService = inject(EventService);

  events$: Observable<AppEvent[]> = this.eventService.getEvents();

  onDelete(id: string) {
    if (confirm('Ви впевнені, що хочете видалити цю подію?')) {
      this.eventService.deleteEvent(id)
        .then(() => console.log('Подію видалено'))
        .catch(err => console.error('Помилка при видаленні:', err));
    }
  }
}
