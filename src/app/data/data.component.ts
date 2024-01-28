import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AssignmentsService } from '../shared/assignments.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  nbData = 0;
  isButtonDisable = false;

  constructor(public authService: AuthService,
    private assignmentService: AssignmentsService,
    private toastr: ToastrService, private router: Router ) { }

  onGenerate() {
    if (this.nbData < 1 || this.nbData > 1000) {
      this.toastr.error('Le nombre doit être compris entre 1 et 1000.', 'Erreur');
      this.isButtonDisable = false; 
      return;
    }
    console.log("ok");
    
    this.isButtonDisable = true;
    this.assignmentService.peuplerBDavecForkJoin(this.nbData)
      .subscribe(() => {
        this.router.navigate(['/home']);
        this.toastr.success(this.nbData + ' devoirs ont été ajoutés ! ', 'Succès');
   
      }, error => {
        this.toastr.error('Une erreur est survenue lors de l\'ajout des devoirs.', 'Erreur');
        this.isButtonDisable = false; 
      });
  }
}
