import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';  
import { Router } from '@angular/router';
import { HighlightButtonDirective } from '../../app/highlight-button.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    HighlightButtonDirective  // הוספת ה-directive לרשימת ה-imports
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          alert(response.token)
          localStorage.setItem('userId', response.userId);  // שמירה של userId
          localStorage.setItem('authToken', response.token); // שמירה של ה-token (אם יש)
          localStorage.setItem('role', JSON.stringify(response.role));  // שמירה של תפקיד המשתמש
      
          alert("Wolcome")
          const{id, name, email, password, role} = response
         
          this.router.navigate(['courses'])
        },
        (error: any) => {
          alert("you cant login ")
        }
      );
    }
  }
}