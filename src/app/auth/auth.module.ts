import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({

declarations:[
    SignupComponent,
    SigninComponent
],
imports:[
CommonModule,
SharedModule,
AuthRoutingModule
]

})
export class AuthModule {}