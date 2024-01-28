import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = false;
  isButtonDisable = false;

  constructor(public authService: AuthService,
    private assignmentService: AssignmentsService,
    private toastr: ToastrService) { }

  logout() {
    this.authService.logout();
  }

  peuplerBD() {
    if(!this.authService.isAuthenticated()){
      this.toastr.error('Vous devez être authentifié !', 'Erreur', {
        positionClass: 'toast-bottom-right'
      });
      return;
    }
    this.isButtonDisable = true;
    this.assignmentService.peuplerBDavecForkJoin(1000)
      .subscribe(() => {
        window.location.reload();
      })
  }

  isPeuplerBD(): boolean {
    return !this.isButtonDisable;
  }

  getIsLoading(): boolean {
    return !this.assignmentService.isLoading;
  }

  getUsername(): string | null {
    return sessionStorage.getItem("username");
  }
}

