import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message= '';
  email!: string;
  password!: string;


  constructor(private auth: AuthService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.auth.authenticate(this.email, this.password)){
        const url = this.route.snapshot.queryParams['requested'];
        this.router.navigateByUrl(url);
    }else{
      this.message= "Your email or password is inccorect";
    }
  }

}
