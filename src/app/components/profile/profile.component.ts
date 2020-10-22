import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile : User
  public settings : any
  public profileForm : FormGroup

  constructor(
    private userService : UserService,
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((user : User) => {
      this.profile = user
      this.profileForm = this.formBuilder.group({
        orderType: [this.profile.settings.orderType, []],
      })
    })

    this.userService.settings.subscribe((settings : any) => {
      this.settings = settings
      console.log(this.settings)
      console.log(settings)

    })


  }

  update(formData){
    console.log(formData)
  }

}
