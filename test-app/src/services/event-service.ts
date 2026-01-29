import {Injectable, inject} from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  docData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppEvent } from '../interfaces/AppEvent';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private firestore = inject(Firestore);
  private eventsCollection = collection(this.firestore, 'events');

  getEvents(): Observable<Event[]>{
    return collectionData(this.eventsCollection, { idField: 'id' }) as Observable<Event[]>;
  }

  getEventById(id: string): Observable<AppEvent> {
    const eventDocRef = doc(this.firestore, `events/${id}`);
    return docData(eventDocRef, { idField: 'id' }) as Observable<AppEvent>;
  }

  addEvent(eventToAdd: AppEvent){
    return addDoc(this.eventsCollection, eventToAdd);
  }

  updateEvent(id: string, data: any) {
    const eventDocRef = doc(this.firestore, `events/${id}`);
    return updateDoc(eventDocRef, data);
  }

  deleteEvent(id: string) {
    const docRef = doc(this.firestore, 'events', id);
    return deleteDoc(docRef);
  }
}
