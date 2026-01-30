import { Routes } from '@angular/router';
import { EventList } from './components/event-list/event-list';
import { EventForm } from './components/event-form/event-form';
import { EventCreate } from './components/event-create/event-create';
import {EventEdit} from './components/event-edit/event-edit';

export const routes: Routes = [
  { path: '', component: EventList },
  { path: 'create', component: EventCreate },
  { path: 'edit/:id', component: EventEdit },
];
