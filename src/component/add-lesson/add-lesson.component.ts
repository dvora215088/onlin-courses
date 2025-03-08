// add-lesson.component.ts
import { Component, Inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // חסר - צריך להוסיף
import { MatButtonModule } from '@angular/material/button'; // חסר - צריך להוסיף
import { MatIconModule } from '@angular/material/icon'; // חסר - צריך להוסיף
import { LessonService } from '../../services/lesson.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // חסר - צריך להוסיף

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, // חסר - צריך להוסיף
    MatButtonModule, // חסר - צריך להוסיף
    MatIconModule, // חסר - צריך להוסיף
    ReactiveFormsModule
  ],
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent {
  @Input() courseId: string = ''; // משתנה לאחסון ה-courseId אם לא נמצא ב-MAT_DIALOG_DATA
  lessoneForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: string } // קבלת הנתונים
  ) {
    // הגדרת הטופס עם כל השדות
    this.lessoneForm = this.fb.group({
      title: ['', Validators.required], // שדה title
      description: ['', [Validators.required, Validators.minLength(10)]] // שדה description עם בדיקת אורך מינימלי
    });

    // אם ה-courseId לא הוזן דרך @Input, קח אותו מה-MAT_DIALOG_DATA
    if (data && data.courseId) {
      this.courseId = data.courseId;
    }
  }

  addLesson(): void {
    console.log("addlesson");
    if (this.lessoneForm.valid) {
      const { title, description } = this.lessoneForm.value;

      this.lessonService.createLesson(this.courseId, { title, content: description }).subscribe({
        next: (response: any) => {
          console.log('lesson added', response);
          // איפוס הטופס לאחר הוספה מוצלחת
          this.lessoneForm.reset();
        },
        error: (error: any) => console.error('error in add lesson ', error)
      });
    }
  }
}