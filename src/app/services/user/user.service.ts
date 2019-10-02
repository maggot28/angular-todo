import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ServerResponse } from 'src/app/models/server-response';
import { BaseService } from '../base.service';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  public readonly currentUser : ReplaySubject<User>

  constructor(
    private http: HttpClient,
  ) {
    super()
    this.currentUser = new ReplaySubject<User>(1)
   }


  getProfile(){
    let response = this.http.get(environment.apiUrl+'/user')
    .pipe(map(data => new ServerResponse(data))).pipe(catchError(this.handleError))

    response.subscribe((response : ServerResponse) => { 
      if(response.status == true){
        this.currentUser.next(new User(response.data))
      }
    }) 
  }




}
