import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth.state';
import { register } from '../auth.actions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterDTO } from '../auth-dto/register.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButton,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const credentials: RegisterDTO = this.registerForm.value;
      credentials.picture = this.selectedFile;
      //console.log("Form Submitted", this.registerForm.value);
      console.log("Passed info for register", credentials);
      this.store.dispatch(register({credentials}));
    }
  }
}
