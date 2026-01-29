import { Routes } from '@angular/router';
import { EventList } from '../components/event-list/event-list';
import { EventForm } from '../components/event-form/event-form';

export const routes: Routes = [{
  path: 'events', component: EventList },
  { path: 'events/create', component: EventForm },
  { path: 'events/edit/:id', component: EventForm },
];
