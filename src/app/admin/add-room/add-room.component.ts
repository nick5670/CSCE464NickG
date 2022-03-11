import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {


  addForm!: FormGroup;
  rooms!: Array<Room>;

  @Output()
  addedRoomEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private service: DataService,
              private router: Router) { }



  ngOnInit(): void {

    this.addForm= this.formBuilder.group({
      name: '',
      capacity: ''
    })

    this.service.getRooms().subscribe(
       next =>{
        this.rooms=next;
      }
    )
  }


  onSubmit()
  {
      let id =0;
      for(const user of this.rooms)
      {
        if(user.id > id)
        {
          id = user.id;
        }
      }
      let newRoom= new Room();
      newRoom.name =this.addForm.value.name;
      newRoom.capacity = this.addForm.value.capacity;
      newRoom.id= id+1;
      newRoom.isOpen= true;
      this.service.addRoom(newRoom).subscribe(
        (room) =>
        {
          this.addedRoomEvent.emit();
          this.router.navigate(['admin']);
        }
      );
    
  }

  onCancel()
  {
    this.router.navigate(['admin']);
  }

}
