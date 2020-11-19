import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, public angularFireAuth: AngularFireAuth) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        if (!localStorage.getItem('isLoggedin')) {
            this.router.navigate(['login']);
        }
        return this.checkLogin(state.url);
    }

    checkLogin(url: string): Observable<boolean> {
        return this.isAuthenticated.pipe(
            tap(auth => (!auth ? this.router.navigate(['login']) : true))
        );
    }

    get isAuthenticated(): Observable<boolean> {
        return this.angularFireAuth.authState.pipe(
            take(1),
            map(authState => !!authState)
        );
    }
}
