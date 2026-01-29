import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  docData,
  updateDoc,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppEvent } from '../interfaces/AppEvent';

@Injectable({ providedIn: 'root' })
export class EventService {
  private firestore = inject(Firestore);
  private eventsCollection = collection(this.firestore, 'events');

  getEvents(): Observable<AppEvent[]> {
    return collectionData(this.eventsCollection, {
      idField: 'id'
    }) as Observable<AppEvent[]>;
  }

  getEventById(id: string): Observable<AppEvent> {
    const eventDocRef = doc(this.firestore, `events/${id}`);
    return docData(eventDocRef, { idField: 'id' }) as Observable<AppEvent>;
  }

  addEvent(event: AppEvent) {
    return addDoc(this.eventsCollection, event);
  }

  updateEvent(id: string, data: any) {
    const eventDocRef = doc(this.firestore, `events/${id}`);
    return updateDoc(eventDocRef, data);
  }

  deleteEvent(id: string) {
    const eventDocRef = doc(this.firestore, `events/${id}`);
    return deleteDoc(eventDocRef);
  }
}
