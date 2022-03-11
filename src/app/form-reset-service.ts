import { EventEmitter, Injectable } from '@angular/core';
import { Room } from './model/room';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetEditFormEvent = new EventEmitter<User>();
  resetRoomFormEvent = new EventEmitter<Room>();
  dataChangedEvent= new EventEmitter();

  constructor() { }
}
