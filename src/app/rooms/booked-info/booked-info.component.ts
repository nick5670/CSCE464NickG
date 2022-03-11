import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal, overlayConfigFactory } from 'ngx-modialog-7';
import { BSModalContext } from 'ngx-modialog-7/plugins/bootstrap';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/room';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-booked-info',
  templateUrl: './booked-info.component.html',
  styleUrls: ['./booked-info.component.css']
})
export class BookedInfoComponent implements OnInit {

  @Input()
  bookedInfo!: Room;

  pipe = new DatePipe('en-US');

  myDate= Date.now();    /*this.bookedInfo.date;*/
  constructor(private service: DataService,
              private router: Router,
              private modal: Modal) { }

  ngOnInit(): void {
    console.log(this.bookedInfo);
  }

  cancelBooking()
  {
    const result = confirm('Are you sure you want to cancel your booking?');

    if(result){
      this.bookedInfo.isOpen= true;
      this.service.updateRoomBooking(this.bookedInfo).subscribe(
        next =>{
          this.router.navigate(['rooms']);
        }
      )
    }
  }

  showUser(id: string){
    const modalConfig = {
			isBlocking: false,
			size: 'lg'}
    this.router.navigate(['rooms'], {queryParams: {action: 'userview',id: id}});
    this.modal.open(UserInfoComponent,overlayConfigFactory(modalConfig, BSModalContext));
  }

}

