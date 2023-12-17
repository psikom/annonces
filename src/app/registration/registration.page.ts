import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
    });
  }

  async signUp() {
    if (this.registrationForm.valid) {
      const { email, password, fullName } = this.registrationForm.value;

      this.authService.signUp(email, password, fullName).subscribe(
        () => {
          // Successful registration
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
