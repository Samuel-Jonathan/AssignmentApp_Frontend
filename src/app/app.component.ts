import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = false;
  isButtonDisable = false;

  constructor(public authService: AuthService,
    private assignmentService: AssignmentsService) { }

  logout() {
    this.authService.logout();
  }

  peuplerBD() {
    this.isButtonDisable = true;
    this.assignmentService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES");
        window.location.reload();
      })
  }

  isPeuplerBD(): boolean {
    return !this.isButtonDisable;
  }

  getIsLoading(): boolean {
    return !this.assignmentService.isLoading;
  }

  getUsername(): string | null{
    return sessionStorage.getItem("username");
  }
}

