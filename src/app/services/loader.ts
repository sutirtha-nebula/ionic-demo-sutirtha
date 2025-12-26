import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingCtrl: LoadingController) {}

  // Show loader
  async show(message: string = 'Please wait...') {
    if (!this.loading) {
      this.loading = await this.loadingCtrl.create({
        message,
        spinner: 'crescent',  // or 'dots', 'lines', etc.
        translucent: true,
        backdropDismiss: false,
        cssClass: 'custom-loader' // custom class
      });
      await this.loading.present();
    }
  }

  // Hide loader
  async hide() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
