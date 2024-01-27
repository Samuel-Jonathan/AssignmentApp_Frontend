import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../assignments/subject.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url = "https://assignmentapp-3x7i.onrender.com/api/subjects";

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url);
  }
}
