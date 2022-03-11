import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder)
  {
    this.createContactForm();
  }

  createContactForm()
  {
    this.contactForm= this.formBuilder.group({

      fullName: [''],
      email: [''],
      message: ['']

    });
  }
}
