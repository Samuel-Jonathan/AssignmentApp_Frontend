import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  username!: string;
  password!: string;
  confirmPassword!: string;
  role!: string;

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.role = 'admin';
  }

  register() {
    if (!this.username || !this.password || !this.confirmPassword || !this.role) {
      this.toastr.error("Tous les champs sont obligatoires.", 'Erreur', {
        positionClass: 'toast-bottom-right' 
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error("Les mot de passes doivent être identique !.", 'Erreur', {
        positionClass: 'toast-bottom-right' 
      });
      return;
    }

    if (this.password.length < 8) {
      this.toastr.error("Le mot de passe doit posséder au moins 8 caractères.", 'Erreur', {
        positionClass: 'toast-bottom-right' 
      });
      return;
    }

    this.authService.getUser(this.username).subscribe(
      (user) => {
        if (user) {
          this.toastr.error("Un compte avec ce nom d'utilisateur existe déjà.", 'Erreur', {
            positionClass: 'toast-bottom-right' 
          });
        } else {
          this.createAccount();
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        if (error.status === 404) {
          this.createAccount();
          this.router.navigate(['/home']);
        } else {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
      }
    );
  }

  createAccount() {
    this.authService.register(this.username, this.password, this.role)
      .subscribe(
        (response) => {
          this.toastr.success(this.username + " créé avec succès.", 'Succès');
        },
        (error) => {
          if (error.status === 201) {
            this.toastr.success(this.username + " créé avec succès.", 'Succès');
          } else {
            console.error("Erreur lors de la création de l'utilisateur :", error);
          }
        }
      );
  }
}
