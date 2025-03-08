import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { IconPipe } from '../../app/icon.pipe';
import { LessonComponent } from '../course-lessons/course-lessons.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddLessonComponent } from "../add-lesson/add-lesson.component";  // חשוב להוסיף את המודול הזה
import { Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  templateUrl: './course.component.html', standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatDividerModule, IconPipe, LessonComponent, AddLessonComponent],
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  [x: string]: any;
  courses: Course[] = [];
  userId = localStorage.getItem('userId') || '';
  isTeacher=false;
   storedRole: string='';

   constructor(
    
    private courseService: CourseService,
    public dialog: MatDialog,
    private router: Router  // השתמש ב-Router ולא ב-Rauter
  ) { }


  // פונקציה לפתיחת הדיאלוג עם שיעורי הקורס
  openLessonsDialog(courseId: string): void {
 
    this.dialog.open(LessonComponent, {
      data: { courseId }
    });
  }
  openAddLessonDialog(courseId: string): void {
    const dialogRef = this.dialog.open(AddLessonComponent, {
      data: { courseId }  // שליחת ה-course.id לדיאלוג
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('הדיאלוג נסגר');
    });
  }
  ngOnInit(): void {
    this.storedRole = localStorage.getItem('role') || '';
    console.log(this.storedRole);  // הדפסת הערך למעקב
    if ( localStorage.getItem('role')?.includes("teacher") ) {
      this.isTeacher = true;
    }
   
    this.courseService.getAllCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  
  enroll(courseId: string): void {

    this.courseService.enrollStudent(courseId, this.userId).subscribe(response => {
      console.log('ההצטרפות בוצעה בהצלחה', response);
      alert("ההצטרפות בוצעה בההצלחה")
    }, error => {
      console.error('שגיאה בהצטרפות לקורס', error);
    });
  }

  unenroll(courseId: string): void {
    alert(this.storedRole)

    this.courseService.unenrollStudent(courseId, this.userId).subscribe(response => {
      console.log('היציאה בוצעה בהצלחה', response);
      alert("היציאה בוצעה בההצלחה")
    }, error => {
      console.error('שגיאה ביציאה מהקורס', error);
    });
  }
  addCours(){
    this.router.navigate(['/addCourse']);

  }
  onDeleteCourse(id: string): void {
    this.courseService.deleteCourse(id).subscribe(
      (response) => {
        console.log('Course deleted successfully', response);
        // פעולה לאחר הצלחה (למשל רענון רשימה)
      },
      (error) => {
        console.error('Error deleting course', error);
        // טיפול בשגיאות אם יש
      }
    );
  }
  // isUserInCourse(coursId: string): Observable<boolean> {
  //   return this.courseService.getCoursesByStudentId(this.userId).pipe(
  //     map(courses => {
  //       // בודקים אם הקורס קיים במערך
  //       return courses.some(course => course.id === coursId);
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching courses:', error);
  //       return of(false); // מחזירים false במקרה של שגיאה
  //     })
  //   );
  //  }
  
}
