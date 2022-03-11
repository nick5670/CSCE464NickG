import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogRef, Modal, ModalComponent, overlayConfigFactory } from 'ngx-modialog-7';
import { BSModalContext } from 'ngx-modialog-7/plugins/bootstrap';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/room';
import { RoomBookModalComponent } from '../room-book-modal/room-book-modal.component';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit, OnChanges{

  @Input()
  room!: Room;
  
  action!: string;
  details = new Array<string>();
  
  constructor(private router: Router, private route: ActivatedRoute,
              private modal: Modal, private service: DataService) { }


  ngOnChanges(): void{
    this.ngOnInit();
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(

      (params) =>{
        this.action = params['action'];
      }
    )
  }

  roomBooked()
  {
    this.router.navigate(['rooms'], {queryParams: {action: 'book',id: this.room.id}})
  }

  roomInfo()
  {
    this.router.navigate(['rooms'], {queryParams : {action: 'info', id: this.room.id}})
  }

  open()
  {
    const modalConfig = {
			isBlocking: true,
			size: 'md'}
    this.router.navigate(['rooms'], {queryParams: {action: 'book',id: this.room.id}})
    this.modal.open(RoomBookModalComponent,overlayConfigFactory(modalConfig,BSModalContext));
  }

}
