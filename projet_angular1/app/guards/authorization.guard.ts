import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let accessToken: string | null = window.localStorage.getItem("jwt-token");
    
    if (accessToken !== null) {
      let decodedToken: any = jwtDecode(accessToken);

      if (decodedToken.scope.includes("ADMIN")) {
        return true;
      }

    }

    alert("Vous devez etre un admin pour à cette page");
    this.router.navigateByUrl("/login");
    return false;

  }

}

