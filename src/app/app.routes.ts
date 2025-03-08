import { Routes } from '@angular/router';
import { RegisterComponent } from '../component/register/register.component';
import { MenueComponent } from '../component/menue/menue.component';
import { LoginComponent } from '../component/login/login.component';
import { CourseComponent } from '../component/course/course.component';
import { AddCoursesComponent } from '../component/add-courses/add-courses.component';
export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // { path: 'my-courses', component: MyCoursesComponent },
    // { path: 'home', component: HomeComponent },
    { path: 'courses', component: CourseComponent },
    { path: 'menue', component: MenueComponent },
    {path:'addCourse',component:AddCoursesComponent}
];
