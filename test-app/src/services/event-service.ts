import {Injectable, inject} from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
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

  addEvent(eventToAdd: AppEvent){
    return addDoc(this.eventsCollection, eventToAdd);
  }

  updateEvent(eventToUpdate: AppEvent){
    const docRef = doc(this.firestore, 'events', eventToUpdate.id!);
    return updateDoc(docRef, { ...eventToUpdate });
  }

  deleteEvent(id: string) {
    const docRef = doc(this.firestore, 'events', id);
    return deleteDoc(docRef);
  }
}
