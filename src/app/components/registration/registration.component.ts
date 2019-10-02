import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Validation } from 'src/app/helpers/form.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm : FormGroup

  constructor(
    private authService : AuthService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['']
    }, { validator: Validation.MatchPassword })
  }
 
  onSubmit(formData) {
    this.authService.registration(formData)
  }
}
