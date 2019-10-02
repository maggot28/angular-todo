import { AbstractControl } from '@angular/forms';

export class Validation {

  static MatchPassword(control: AbstractControl) {
    let password = control.get('password').value
    let confirmPassword = control.get('password_confirmation').value
    if (password != confirmPassword) {
      control.get('password_confirmation').setErrors({ confirmPassword: true })
    } else {
      return null;
    }
  }
}
