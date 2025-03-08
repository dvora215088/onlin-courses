import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenueComponent } from "../component/menue/menue.component";
import { AddCoursesComponent } from '../component/add-courses/add-courses.component';

import { CourseComponent } from "../component/course/course.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenueComponent, AddCoursesComponent, CourseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'onlin-courses';
}
