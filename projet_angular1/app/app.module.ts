import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProfilComponentComponent } from './ProfilComponent/ProfilComponent.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './Admin/Admin.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';

@NgModule({
  declarations: [							
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent, canActivate : [AuthorizationGuard] }
    ])
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass : AppHttpInterceptor, multi : true}],
  bootstrap: [AppComponent,HomeComponent,AdminComponent,LoginComponent]
})
export class AppModule { }
