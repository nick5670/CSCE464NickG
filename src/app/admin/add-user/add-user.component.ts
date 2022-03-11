import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal, overlayConfigFactory } from 'ngx-modialog-7';
import { BSModalContext } from 'ngx-modialog-7/plugins/bootstrap';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/user';
import { TermsModalComponent } from '../terms-modal/terms-modal.component';


export class TermsModalContext extends BSModalContext{
  public title!: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {


  addForm!: FormGroup

  users!: Array<User>

  username = new FormControl('',[Validators.required, Validators.minLength(3)])

  @Output()
  addedUserEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private service: DataService,
              private router: Router, private modal: Modal) { }


  ngOnInit(): void {

    this.addForm= this.formBuilder.group({
      username: this.username,
      email: '',
      role: '',
      password: '',
      password2:'',
      confirm: [false, Validators.requiredTrue]
    })

    this.service.getUsers().subscribe(
       next =>{
        this.users=next;
      }
    )

  }

  onSubmit()
  {

    const result = confirm('Are you sure you want to add this user?');

    if(result){
      let id =0;
      for(const user of this.users)
      {
        if(user.id > id)
        {
          id = user.id;
        }
      }
      let newUser= new User();
      newUser.email =this.addForm.value.email;
      newUser.name = this.addForm.value.username;
      newUser.role=this.addForm.value.role;
      newUser.password=this.addForm.value.password;
      newUser.id= id+1;
      this.service.addUser(newUser).subscribe(
        (user) =>
        {
          this.addedUserEvent.emit();
          this.router.navigate(['admin']);
        }
      );
    }
    
  }

  onCancel()
  {
    this.router.navigate(['admin']);
  }

  open()
  {
    const modalConfig = {
			isBlocking: false,
			size: 'md'}
      this.modal.open(TermsModalComponent,overlayConfigFactory(modalConfig,BSModalContext));
  }

}
