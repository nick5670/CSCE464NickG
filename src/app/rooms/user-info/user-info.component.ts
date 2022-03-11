import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { DialogRef, ModalComponent } from 'ngx-modialog-7';
import { BSModalContext } from 'ngx-modialog-7/plugins/bootstrap';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/user';


export class UserInfoModalContext extends BSModalContext{
  public title!: string;
}


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, ModalComponent<UserInfoModalContext> {

  users!: Array<User>;

  selectedUser!: User;

  public context!: UserInfoModalContext;


  constructor(public dialog: DialogRef<UserInfoModalContext>,
              public service: DataService,
              private route: ActivatedRoute) { }


  loadData()
  {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(

      (params) =>{
        const id = params['id'];
        console.log(id);
        this.service.getUser(id).subscribe(
          (next: any) =>
          {
            this.selectedUser = next;
            console.log(this.selectedUser);
          }
        );
      }
    )
  }

}
