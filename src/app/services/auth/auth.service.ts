import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/services/base.service';
import { ServerResponse } from 'src/app/models/server-response';

import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    super()
  }


  registration(registrtionForm) {
    let response = this.http.post(environment.apiUrl+'/auth/signup', registrtionForm)
    .pipe(map(data => new ServerResponse(data))).pipe(catchError(this.handleError))

    response.subscribe((response : ServerResponse) => { 
      if(response.status == true){
        sessionStorage.setItem("todoAuthToken", response.data.token)
        this.userService.getProfile()
        this.router.navigate(['/']);
      }
    }) 
  }

  login(loginForm) {
    let response = this.http.post(environment.apiUrl+'/auth/login', loginForm)
    .pipe(map(data => new ServerResponse(data))).pipe(catchError(this.handleError))

    response.subscribe((response : ServerResponse) => { 
      if(response.status == true){
        sessionStorage.setItem("todoAuthToken", response.data.token)
        this.userService.getProfile()
        this.router.navigate(['/']);
      }
    }) 
  }

  logout() {
    let response = this.http.get(environment.apiUrl+'/auth/logout')
    .pipe(map(data => new ServerResponse(data))).pipe(catchError(this.handleError))

    response.subscribe((response : ServerResponse) => { 
      if(response.status == true){
        sessionStorage.setItem("todoAuthToken", "")
        this.router.navigate(['/login']);
      }
    }) 
  }

  isLoggedOut() {
    return sessionStorage.getItem("todoAuthToken") === '' || typeof sessionStorage.getItem("todoAuthToken") === 'undefined' || sessionStorage.getItem("todoAuthToken") === null
  }
  
}
