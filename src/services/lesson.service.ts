import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = 'http://localhost:3000/api/courses'; // החלף ל-URL של ה-API שלך

  constructor(private http: HttpClient) { }

  // Get all lessons in a course
  getLessons(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}/lessons`);
  }

  // Get lesson by ID
  getLesson(courseId: string, lessonId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
  }

  // Create a new lesson (Teacher only)
  createLesson(courseId: string, lessonData: { title: string, content: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${courseId}/lessons`, lessonData);
  }

  // Update lesson by ID (Teacher only)
  updateLesson(courseId: string, lessonId: string, lessonData: { title: string, content: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lessonData);
  }

  // Delete lesson by ID (Teacher only)
  deleteLesson(courseId: string, lessonId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
  }
}
