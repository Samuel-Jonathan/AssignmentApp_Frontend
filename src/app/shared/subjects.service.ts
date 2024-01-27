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

  url = "http://localhost:8010/api/subjects";

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url);
  }
}
