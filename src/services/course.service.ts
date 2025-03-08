import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  // Get all courses
  getAllCourses(): Observable<any> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // Get course by ID
  getCourseById(id: string): Observable<any> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // Get courses by student ID
  getCoursesByStudentId(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}`);
  }

  // Create new course
  createCourse(courseData: { title: string; description: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, courseData);
  }

  // Update course by ID
  updateCourse(id: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updates);
  }

  // Delete course by ID
  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Enroll student in course
  enrollStudent(courseId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${courseId}/enroll`, { userId });
  }

  // Unenroll student from course
  unenrollStudent(courseId: string, userId: string): Observable<any> {
    return this.http.request<any>('delete', `${this.apiUrl}/${courseId}/unenroll`, { body: { userId } });
  }
}
