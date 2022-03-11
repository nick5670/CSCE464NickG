import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated= false;

  constructor() { }

  authenticate(email: string, password: string): boolean{
    if( email === 'nickg@gmail.com' && password === 'secret'){
      this.isAuthenticated=true;
    }
    return this.isAuthenticated;
  }
}

