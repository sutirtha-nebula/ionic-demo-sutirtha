import { Component, OnInit } from '@angular/core';
import { AccountMenuPage } from '../components/account-menu/account-menu.page';
import { PopoverController } from '@ionic/angular';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage {
  products: any[] = [];

  constructor(private popoverCtrl: PopoverController, private apiService: ApiService) { }

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

  async ngOnInit() {
    this.apiService.get('products').subscribe(data => {
      this.products = data?.products || [];
      console.log(this.products);
      console.log('Products Data:', data);
    });
  }

}
