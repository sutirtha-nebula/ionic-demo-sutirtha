import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from "@ionic/angular";
import { AccountMenuPage } from '../account-menu/account-menu.page';
import { CartService } from 'src/app/services/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  @Input() title:any;

  constructor(private popoverCtrl: PopoverController, private cartService: CartService) { }
    cartCount: number = 0;
    
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

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((acc, item) => acc + item.totalQuantity, 0);
    });
  }

}
