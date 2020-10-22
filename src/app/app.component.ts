import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do';


  constructor(
    private translate : TranslateService,
    private authService : AuthService,
    private userService : UserService
  ) {
    console.log()
    if(!this.authService.isLoggedOut()){
      this.userService.getProfile()
      this.userService.getSettings()
    }


    this.translate.setDefaultLang('en')
	}
}
