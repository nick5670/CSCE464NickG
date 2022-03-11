import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { DataService } from '../data.service';
import { Room } from '../model/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms!: Array<Room>;

  selectedRoom!: Room;
  action!: string;
  faSquare= faSquare;
  image = document.createElement("img");
  app = document.getElementById("app");

  constructor(private service: DataService, private router: Router,
              private route: ActivatedRoute, private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.rooms= this.service.rooms;
    console.log(this.rooms);
    this.route.queryParams.subscribe(
      (params) =>{
        const id = params['id'];
        this.action = params['action'];
        if(id)
        {
          this.selectedRoom = this.rooms.find(room =>room.id === +id)!
        }
      }
    )
  }

  getSelectedRoom(id: number)
  {
    this.router.navigate(['rooms'], {queryParams: {action: 'view',id: id}});
  }

  displayPhoto(id:number){
    this.image.src = "assets/images/room"+id+".jpg";
    this.image.id="room";
    document.getElementById("app")?.appendChild(this.image);
    console.log("images/room"+id+".jpg");

  }

  hidePhoto(id:number){
    document.getElementById("room")?.remove();
  }

}
