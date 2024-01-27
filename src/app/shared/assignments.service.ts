import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from '../shared/data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url = "http://localhost:8010/api/assignments";
  isLoading: boolean = false;

  getToken() {
    return sessionStorage.getItem('access_token');
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }),
      withCredentials: true
    };
  }

  getAllAssignments(): Observable<any> {
    return this.http.get<Assignment[]>(this.url + "/all");
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.url + "/" + id);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      return new Observable<Assignment | undefined>();
    }
  
    return this.http.get<Assignment[]>(this.url + "/all?sortBy=id:desc").pipe(
      switchMap(assignments => {
        const newId = assignments.length + 1; 
        assignment.id = newId;        
        return this.http.post<Assignment>(this.url, assignment, this.getHttpOptions());
      })
    );
  }

  addAllAssignments(assignment: Assignment): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      return new Observable<Assignment | undefined>();
    }
    return this.http.post<Assignment>(this.url, assignment, this.getHttpOptions());
  }
  

  updateAssignment(assignment: Assignment): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      return new Observable<Assignment | undefined>();
    }
    return this.http.put<Assignment>(this.url, assignment, this.getHttpOptions());
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      return new Observable<Assignment | undefined>();
    }
    let deleteURI = this.url + '/' + assignment._id;
    return this.http.delete(deleteURI, this.getHttpOptions());
  }
  
  peuplerBDavecForkJoin() {
    let appelsVersAddAssignments: Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.studentId = a.studentId;
      nouvelAssignment.subjectId = a.subjectId;
      nouvelAssignment.note = a.note;
      nouvelAssignment.comment = a.comment;

      appelsVersAddAssignments.push(this.addAllAssignments(nouvelAssignment))
    });
    return forkJoin(appelsVersAddAssignments);
  }

  getAssignmentPagine(page: number, limit: number, search?: string): Observable<any> {
    let params = `?page=${page}&limit=${limit}`;
    if (search) {
      params += `&search=${encodeURIComponent(search)}`;
    }
    return this.http.get<any>(this.url + params, this.getHttpOptions());
  }

}
