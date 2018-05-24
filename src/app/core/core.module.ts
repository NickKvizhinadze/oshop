import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsNavbarComponent } from 'app/core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from 'app/core/components/home/home.component';
import { LoginComponent } from 'app/core/components/login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
