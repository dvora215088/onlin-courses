import { Component, Inject, Input, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-lessons',
  standalone: true,
  imports: [MatCardModule,MatIconModule],
  templateUrl: './course-lessons.component.html',
  styleUrl: './course-lessons.component.css'
})

export class LessonComponent {
  http: any;
  apiUrl: any;
  isTeacher=false;
  storedRole: string='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private lessonService: LessonService) {
    console.log(this.data.courseId); 
 }

  lessons: any[] = [];
  errorMessage: string = '';
 

  ngOnInit(): void {
    this.getLessons(); 
    this.storedRole = localStorage.getItem('role') || '';
    console.log(this.storedRole);  // הדפסת הערך למעקב
    if ( localStorage.getItem('role')?.includes("teacher") ) {
      this.isTeacher = true;
    }// קורא לפונקציה שמביאה את השיעורים עם טעינת הקומפוננט
  }

  // Fetch all lessons in a course
  getLessons(): void {
    this.lessonService.getLessons(this.data.courseId).subscribe(
      (data) => {
        this.lessons = data;
      },
      (_error) => {
        this.errorMessage = 'Error fetching lessons';
      }
    );
  }

  // Fetch a single lesson by ID
  getLesson(lessonId: string): void {
    this.lessonService.getLesson(this.data.courseId, lessonId).subscribe(
      (data) => {
        console.log(data); // כאן תוכל להציג את השיעור
      },
      (_error) => {
        this.errorMessage = 'Error fetching lesson';
      }
    );
  }

  // Create a new lesson
  createLesson(): void {
    const lessonData = { title: 'New Lesson', content: 'Lesson Content' };
    this.lessonService.createLesson(this.data.courseId, lessonData).subscribe(
      (response) => {
        console.log('Lesson created', response);
        this.getLessons();  // עדכון הרשימה אחרי יצירת השיעור
      },
      (_error) => {
        this.errorMessage = 'Error creating lesson';
      }
    );
  }

  // Update a lesson by ID
  updateLesson(lessonId: string): void {
    const lessonData = { title: 'Updated Lesson', content: 'Updated Content' };
    this.lessonService.updateLesson(this.data.courseId, lessonId, lessonData).subscribe(
      (response) => {
        console.log('Lesson updated', response);
        this.getLessons();  // עדכון הרשימה אחרי עדכון השיעור
      },
      (_error) => {
        this.errorMessage = 'Error updating lesson';
      }
    );
  }

  // Delete a lesson by ID
  deleteLesson(lessonId: string): void {
    this.lessonService.deleteLesson(this.data.courseId, lessonId).subscribe(
      (response) => {
        console.log('Lesson deleted', response);
        this.getLessons();  // עדכון הרשימה אחרי מחיקת השיעור
      },
      (_error) => {
        this.errorMessage = 'Error deleting lesson';
      }
    );
  }
}
