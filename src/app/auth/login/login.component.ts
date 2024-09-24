import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth.state';
import { login } from '../auth.actions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginDTO } from '../auth-dto/login.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButton,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginDTO = this.loginForm.value;
      this.store.dispatch(login({credentials}));
    }
  }
}
