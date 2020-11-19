import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {snapshotToArray} from '../../layout/date/form.component';

@Injectable()
export class AuthGuardPermission implements CanActivate {
    arrayBarber;
    constructor(private router: Router) {
    }

    canActivate() {
        const permission = localStorage.getItem('permission');
        const isLoggedin = localStorage.getItem('isLoggedin');
        const uid = localStorage.getItem('uid');

        let permissionAux;
        let nameUser;

        const refBarber = firebase.database().ref().child('users/').orderByChild('uid').equalTo(uid);
        refBarber.on('value', resp => {
            this.arrayBarber = [];
            this.arrayBarber = snapshotToArray(resp);
            permissionAux = this.arrayBarber[0].acessLevel;
            nameUser = this.arrayBarber[0].name;
            localStorage.setItem('permission', permissionAux);
            localStorage.setItem('name', nameUser);
        });
        if (!isLoggedin) {
            this.router.navigate(['/login']);
            return false;
        }
        if (permission == 'adm' && permission == permissionAux) {
            return true;
        }
        else {
            this.router.navigate(['/access-denied']);
            return false;
        }
    }
}

