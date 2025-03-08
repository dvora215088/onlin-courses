import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='http://localhost:3000/api/auth'
  constructor(private http:HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        if (response.token) {
          sessionStorage.setItem('authToken', response.token); // שמירת ה-token ב-sessionStorage
        }
      })
    );
  }  
  register(name: string, email: string, password: string, role: string): Observable<any> {
    const body = { name, email, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, body);
  }
  
}