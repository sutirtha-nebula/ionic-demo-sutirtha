import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from "src/app/app-routing.module";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule
],
  exports: [HeaderComponent]
})
export class SharedModule { }
