import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  // 🔔 Error Toast (non-blocking)
  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'danger',
      cssClass: 'error-toast'
    });
    await toast.present();
  }

  // 🚨 Error Alert (blocking)
  async showAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: ['OK'],
      cssClass: 'error-alert'
    });
    await alert.present();
  }
}
