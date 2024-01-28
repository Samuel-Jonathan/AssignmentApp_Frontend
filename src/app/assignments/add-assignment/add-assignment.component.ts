import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { SubjectsService } from 'src/app/shared/subjects.service';
import { Subject } from '../subject.model';
import { StudentsService } from 'src/app/shared/students.service';
import { Student } from '../student.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../assignment-detail/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  id!: number;
  nomDevoir!: string;
  dateRendu!: Date;
  subjects: Subject[] = [];
  students: Student[] = [];
  selectedSubjectId!: number;
  selectedStudentId!: number;
  selectedNote!: number;
  comment!: string;
  notes: number[] = [];
  @ViewChild('stepper') stepper: any;

  constructor(
    private assignmentsService: AssignmentsService,
    private subjectsService: SubjectsService,
    private studentsService: StudentsService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getStudents();

    this.notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  }

  nextStep(stepper: any) {
    stepper.next();
  }

  previousStep(stepper: any) {
    stepper.previous();
  }

  getSubjects() {
    this.subjectsService.getSubjects().subscribe((subjectsTab: Subject[]) => {
      this.subjects = subjectsTab;
    });
  }

  getStudents() {
    this.studentsService.getStudents().subscribe((studentsTab: Student[]) => {
      this.students = studentsTab;
    });
  }

  onSubmit() {
    if (!this.nomDevoir || !this.dateRendu || !this.selectedStudentId || !this.selectedSubjectId
      || !this.notes) {
      this.toastr.error("Tous les champs sont obligatoires sauf le champ pour le commentaire !", 'Erreur', {
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.nomDevoir) {
      this.toastr.error("Le devoir doit avoir un nom !", 'Erreur', {
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.dateRendu) {
      this.toastr.error("Le devoir doit avoir une date de rendu !", 'Erreur', {
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.selectedStudentId) {
      this.toastr.error("Le devoir doit avoir un étudiant  !", 'Erreur', {
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.selectedSubjectId) {
      this.toastr.error("Le devoir doit avoir une matière !", 'Erreur', {
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.notes) {
      this.toastr.error("Le devoir doit avoir une note !", 'Erreur', {
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    const newAssignment = new Assignment();

    newAssignment.id = this.id;
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.subjectId = this.selectedSubjectId;
    newAssignment.studentId = this.selectedStudentId;
    newAssignment.note = this.selectedNote;
    newAssignment.comment = this.comment;

    this.assignmentsService.addAssignment(newAssignment).subscribe((message) => {
      console.log(message);
      this.toastr.success("Le devoir a été ajouté !", '', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/home']);
    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Voulez-vous vraiment ajouter ce devoir ?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.onSubmit();
      }
    });
  }

  isAdmin() {
    if (this.authService.isAdmin()) {
      return true;
    }
    return false;
  }
}
