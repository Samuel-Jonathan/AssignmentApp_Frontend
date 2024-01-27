import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://assignmentapp-3x7i.onrender.com/api/';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
  }

  register(username: string, password: string, role: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password, role });
  }

  login(username: string, password: string, role: string): Observable<any> {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("role", role);
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem('access_token');
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/users/" + username);
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token || '');
  }

  isAdmin(): boolean {    
    return sessionStorage.getItem("role") === "admin";
  }
}
