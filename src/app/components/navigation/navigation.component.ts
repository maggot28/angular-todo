import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public profile : User
  constructor(
    private userService : UserService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((user : User) => {
      this.profile = user
    })
  }

  logout(){
    this.authService.logout()
  }

}
