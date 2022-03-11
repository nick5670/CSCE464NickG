import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from './model/room';
import { User } from './model/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms!: Array<Room>
  users!: Array<User>


  constructor(private http: HttpClient){
    this.rooms= new Array<Room>();
    this.users= new Array<User>();
    const room1 = new Room();
    room1.id=1;
    room1.name="Ballroom"
    room1.isOpen=true;
    room1.capacity=20;

    const room2 = new Room();
    room2.id=2;
    room2.name="Large Meeting room"
    room2.isOpen=true;
    room2.capacity=10;

    const room3 = new Room();
    room3.id=3;
    room3.name= "Meeting Room"
    room3.isOpen=true;
    room3.capacity=5;


    const user1 = new User();
    user1.id= 1;
    user1.name="user 1";
    user1.email= "User1@something.com";
    user1.role="user";

    const user2 = new User();
    user2.id= 2;
    user2.name="user 2";
    user2.email= "User2@something.com";
    user2.role="user";

    const user3 = new User();
    user3.id= 3;
    user3.name="user 3";
    user3.email= "User3@something.com";
    user3.role="user";

    this.rooms.push(room1);
    this.rooms.push(room2);
    this.rooms.push(room3);
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);

  }

  getRooms(): Observable<Array<Room>>
  {
    return of(this.rooms);
  }

  getUsers(): Observable<Array<User>>
  {
    return of(this.users);
  }

  getUser(id: number): Observable<User | undefined>{
    const user = this.users.find( u => u.id === id)
    return of(user);
  }

  updateRoomBooking(room: Room) : Observable<Room | undefined>
  {
    const originalRoom = this.rooms.find(r => r.id === room.id);
    if(originalRoom)
    {
      originalRoom.isOpen=false;
      originalRoom.bookedRoomDetails= room.bookedRoomDetails;
    }
     return of(originalRoom);
  }


  addUser(user: User): Observable<User>
  {
    this.users.push(user);
    return of(user);
  }

  addRoom(room: Room): Observable<Room>
  {
    this.rooms.push(room);
    return of(room);
  }

  updateUser(user: User) : Observable<User | undefined >{

    const originalUser = this.users.find( u => u.id === user.id);
    if(originalUser)
    {
      originalUser.name=user.name;
      originalUser.email=user.email;
      originalUser.role=user.role;
    }

    return of(originalUser);

  }

  deleteUser(id: number) : Observable<any>{
    const user = this.users.find( u => u.id === id)
    if(user)
    {
      this.users.splice(this.users.indexOf(user), 1);
    }
    return of(null);
  }

  deleteRoom(id: number) : Observable<any>{
    const room = this.rooms.find( u => u.id === id)
    if(room)
    {
      this.rooms.splice(this.rooms.indexOf(room), 1);
    }
    return of(null);
  }
}
