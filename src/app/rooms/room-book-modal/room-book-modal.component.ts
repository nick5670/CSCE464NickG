import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogRef, ModalComponent } from 'ngx-modialog-7';
import { BSModalContext } from 'ngx-modialog-7/plugins/bootstrap';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset-service';
import { Room } from 'src/app/model/room';
import { RoomsComponent } from '../rooms.component';

export class RoomBookModalContext extends BSModalContext{
  public title!: string;
}

@Component({
  selector: 'app-room-book-modal',
  templateUrl: './room-book-modal.component.html',
  styleUrls: ['./room-book-modal.component.css']
})
export class RoomBookModalComponent implements OnInit, ModalComponent<RoomBookModalContext> {

  bookingRoom!: Room;

  rooms!: Array<Room>;

  details = new Array<string>();
  roomForm!: FormGroup;

  current = new Date();

  public context!: RoomBookModalContext;

  @Output()
  dataChangedEvent= new EventEmitter();


  constructor( public dialog: DialogRef<RoomBookModalContext>,
               public service: DataService,
               private builder: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private datePipe: DatePipe,
               private dataChanged: FormResetService) {
  }

  loadData()
  {
    this.service.getRooms().subscribe(
      (next) => {
        this.rooms = next;
        this.processUrlParams();
        this.createForm();
      }
    )
    this.processUrlParams();
    this.createForm();
  }

  processUrlParams()
  {
    this.route.queryParams.subscribe(
      (params: { [x: string]: string; })=>{
        const id = params['id'];
        if(params['action'] === 'book')
        {
          this.bookingRoom = this.rooms.find(room => room.id === +id)!;
        }
      }
    );
  }

  createForm()
  {

    //make sure this updates everytime we want to submit a new room form
    // Currently data from an older form is staying in thr form and not
    // allowing for new data to be added
    this.roomForm = this.builder.group({
      bookerId : "Please enter your Id",
      numOccupants : [0 ,Validators.max(this.bookingRoom.capacity)],
      startTime : '',
      endTime : '',
      date: this.current.getDate

    });
  }



  ngOnInit(): void {

    this.loadData();

  }

  handleClose()
  {
    this.dialog.close();
  }

  onSubmit(){
    this.details.push(this.roomForm.value['bookerId']);
    this.details.push(this.roomForm.value['startTime']);
    this.details.push(this.roomForm.value['endTime']);

    this.bookingRoom.numPeople= this.roomForm.value['numOccupants'];
    this.bookingRoom.date = this.roomForm.value['date'];
    this.bookingRoom.bookedRoomDetails= this.details;
    this.bookingRoom.isOpen= false;


    this.service.updateRoomBooking(this.bookingRoom).subscribe(
      (      next: any) =>{
        this.dataChanged.dataChangedEvent.emit();
      }
    );

    this.dialog.close();
    this.router.navigate(['rooms']);

  }

}
