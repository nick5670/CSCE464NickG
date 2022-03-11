import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset-service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input()
  user!: User;

  editForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private formReset: FormResetService,
              private router: Router,
              private service: DataService) { }


  ngOnChanges(): void {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm()
  {
    this.editForm= this.formBuilder.group({
      username: this.user.name,
      email: this.user.email,
      role: this.user.role
    });
  }

  onSubmit()
  {
    const result = confirm('Are you sure you want to submit these changes for ' + this.user.name+'?');
    this.user.name =this.editForm.value['username'];
    this.user.email =this.editForm.value['email']
    this.user.role =this.editForm.value['role']

    this.service.updateUser(this.user).subscribe(
      next =>{
          this.router.navigate(['admin']);
      }
    )
  }

  onCancel()
  {
    this.router.navigate(['admin']);
  }

}
