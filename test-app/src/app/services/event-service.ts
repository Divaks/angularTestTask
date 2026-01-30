import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  docData,
  updateDoc,
  addDoc, increment,
} from '@angular/fire/firestore';
import {map, Observable, tap} from 'rxjs';
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
    const docRef = doc(this.firestore, `events/${id}`);
    return docData(docRef, { idField: 'id' }).pipe(
      map(data => {
        if (!data) throw new Error('Event not found');
        return data as AppEvent;
      })
    );
  }

  addEvent(event: AppEvent) {
    const colRef = collection(this.firestore, 'events');
    return addDoc(colRef, event);
  }

  updateEvent(id: string, event: Partial<AppEvent>) {
    const docRef = doc(this.firestore, `events/${id}`);
    return updateDoc(docRef, event);
  }

  deleteEvent(id: string) {
    const eventDocRef = doc(this.firestore, `events/${id}`);
    return deleteDoc(eventDocRef);
  }

  async registerForEvent(eventId: string){
    const eventRef = doc(this.firestore, `events`, eventId);
    return updateDoc(eventRef,{
      countOfMembers: increment(1)
    });
  }
}
