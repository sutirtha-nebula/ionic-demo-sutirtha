import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.page.html',
  standalone: false
})
export class AccountMenuPage {

  constructor(
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private router: Router
  ) {}

  goToProfile() {
    this.popoverCtrl.dismiss();
    this.router.navigate(['/profile']);
  }

  logout() {
    this.popoverCtrl.dismiss();
    this.authService.logout();
  }
}
