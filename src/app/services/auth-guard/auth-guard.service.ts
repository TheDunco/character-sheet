import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService} from '../auth/auth-service'
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

// Thanks so much to Jeff Delany for the Google Auth tutorial!
// https://fireship.io/lessons/angularfire-google-oauth/

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.auth.user$.pipe(
           take(1),
           map(user => !!user), // <-- map to boolean
           tap(loggedIn => {
             if (!loggedIn) {
               console.log('access denied')
               this.router.navigateByUrl('');
             }
         })
    )
  }
}
