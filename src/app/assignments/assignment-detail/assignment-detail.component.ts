import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignementTransmis!: Assignment | null;

  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute,
    private router: Router, private authService: AuthService,
    private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      if (assignment) {
        this.assignementTransmis = assignment;
        console.log(this.assignementTransmis.nom);

      }
    });
  }

  onAssignmentRendu() {
    if (this.assignementTransmis) {
      this.assignementTransmis.rendu = true;
    }

    if (this.assignementTransmis) {
      this.assignmentsService.updateAssignment(this.assignementTransmis).subscribe(
        () => {
          this.router.navigate(["/home"]);
        });
    }
  }

  onDelete() {
    if (this.assignementTransmis) {
      this.assignmentsService.deleteAssignment(this.assignementTransmis)
        .subscribe(() => {
          this.toastr.success("Le devoir a été supprimé !", 'Succès', {
            positionClass: 'toast-bottom-right'
          });
          this.router.navigate(["/home"]);
        })
    }
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Voulez-vous vraiment supprimer ce devoir ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.onDelete();
      }
    });
  }

  onClickEdit() {
    if (this.authService.isAuthenticated()) {
      this.toastr.error("Vous devez être authentifié !", 'Erreur', {
        positionClass: 'toast-bottom-right'
      });
      return;
    }
    if (this.assignementTransmis) {
      this.router.navigate(["/assignment", this.assignementTransmis.id, 'edit'],
        { queryParams: { nom: this.assignementTransmis.nom }, fragment: 'edition' });
    }
  }

  isAdmin() {
    if (this.authService.isAdmin()) {
      return true;
    }
    return false;
  }
}
