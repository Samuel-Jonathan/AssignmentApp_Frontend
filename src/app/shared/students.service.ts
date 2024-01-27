import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Student } from '../assignments/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url = "https://assignmentapp-3x7i.onrender.com/api/students";

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }
}
