import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(this.loginService.isAuthenticated == true){
      return true;
    }

    else{
      //alert("mila authentifié aloha an");
      console.log("mila authentifié letsy aloha a");
      this.router.navigateByUrl("/login");
      return false;
    }
   
  }

}

