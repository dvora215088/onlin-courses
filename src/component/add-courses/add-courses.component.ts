import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService, private router: Router) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  addCourse(): void {
    if (this.courseForm.valid) {
      const { title, description } = this.courseForm.value;

      this.courseService.createCourse({ title, description }).subscribe({
        next: (response: any) => {
          console.log('קורס נוסף בהצלחה', response);
          // ניווט לאחר הוספת הקורס
          this.router.navigate(['/courses']);
        },
        error: (error: any) => console.error('שגיאה בהוספת קורס', error)
      });
    }
  }
}
