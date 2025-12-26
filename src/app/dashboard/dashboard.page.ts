import { Component, OnInit } from '@angular/core';
import { AccountMenuPage } from '../components/account-menu/account-menu.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage {

  constructor(private popoverCtrl: PopoverController) { }

  async openAccountMenu(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: AccountMenuPage,
      event: ev,
      translucent: true,
      showBackdrop: true,
      cssClass: 'account-popover'
    });
    
    await popover.present();
}

}
