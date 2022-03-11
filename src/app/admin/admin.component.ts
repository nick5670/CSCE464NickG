import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormResetService } from '../form-reset-service';
import { Room } from '../model/room';
import { User } from '../model/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  contactForm!: FormGroup;
  users!: Array<User>;
  selectedUser!: User;
  selectedRole!: string;
  searchText: string ='';
  action!: string;
  rooms!: Array<Room>;

  constructor(private service: DataService,private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private formReset: FormResetService) {}


  loadData()
  {

   // this.service.getUsers().subscribe(
     // next =>{
      //  this.users= next;
     // }
   // );

   // this.service.getRooms().subscribe(
    //  next =>{
     //   this.rooms= next;
     // }
   // );
  }

  ngOnInit(): void {

    //this.loadData();
    this.users= this.service.users;
    this.rooms= this.service.rooms;
    console.log(this.service.rooms);
    this.route.queryParams.subscribe(

      (params) =>{
        const id = params['id'];
        this.action = params['action'];
        if(id)
        {
          this.selectedUser = this.users.find(user =>user.id === +id)!
        }
        if(params['action'] === 'add')
        {
          this.selectedUser= new User();
        }
      }
    )

  }

  addUser()
  {
    this.router.navigate(['admin'], {queryParams: {action: 'add-user'}});
  }

  addRoom()
  {
    this.router.navigate(['admin'], {queryParams: {action: 'add-room'}});
  }

  editUser(id: number)
  {
    this.router.navigate(['admin'], {queryParams: {id: id ,action: 'edit'}});
  }

  deleteUser(id: number){

    const result = confirm('Are you sure you want to delete this user?');

    if(result)
    {
      this.service.deleteUser(id).subscribe(
          next =>{
            this.loadData();
          });
    }
  }

  deleteRoom(id: number){

    const result = confirm('Are you sure you want to delete this room?');

    if(result)
    {
      this.service.deleteRoom(id).subscribe(
          next =>{
            this.loadData();
          });
    }
  }

}
