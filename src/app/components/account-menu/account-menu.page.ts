import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.page.html',
  standalone: false
})
export class AccountMenuPage {

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router
  ) {}

  goToProfile() {
    this.popoverCtrl.dismiss();
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.clear();
    this.popoverCtrl.dismiss();
    this.router.navigate(['/login']);
  }
}
