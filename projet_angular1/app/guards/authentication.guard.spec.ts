import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { of } from 'rxjs';
import { LoginService } from '../login/login.service';

class MockLoginService {
  isAuthenticated = false;

  // Autres méthodes du service nécessaires pour les tests
}

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let router: Router;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthenticationGuard,
        { provide: LoginService, useClass: MockLoginService },
      ],
    });

    guard = TestBed.inject(AuthenticationGuard);
    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if user is authenticated', () => {
    loginService.isAuthenticated = true;

    const canActivateResult = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(true);
    // Vous pouvez ajouter d'autres attentes en fonction de votre logique de navigation
  });

  it('should redirect to /admin if user is authenticated', () => {
    loginService.isAuthenticated = true;

    const spy = spyOn(router, 'navigateByUrl');

    guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(spy).toHaveBeenCalledWith('/admin');
  });

  it('should prevent navigation and redirect to /login if user is not authenticated', () => {
    loginService.isAuthenticated = false;

    const spy = spyOn(router, 'navigateByUrl');

    const canActivateResult = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(false);
    expect(spy).toHaveBeenCalledWith('/login');
  });

});
