import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {snapshotToArray} from '../layout/date/form.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    email;
    password;
    public alerts: Array<any> = [];
    arrayBarber;
    userUid;

    constructor(
        public router: Router,
        public angularFireAuth: AngularFireAuth
    ) {
    }

    ngOnInit() {
    }

    /**
     * Method login.
     */
    onLoggedin() {
        this.alerts = [];
        this.alerts.push({
            id: 2,
            type: 'info',
            message: `Aguarde um momento...`
        });
        this.angularFireAuth.signInWithEmailAndPassword(this.email, this.password)
            .then(res => {
                this.userUid = firebase.auth().currentUser.uid;
                console.log(this.userUid);
                localStorage.setItem('uid', this.userUid);
                localStorage.setItem('isLoggedin', 'true');
                this.getUid();
            })
            .catch(err => {
                this.alerts = [];
                this.clearFields();
                this.alerts.push(
                    {
                        id: 1,
                        type: 'danger',
                        message: `Erro ao efetuar login, tente novamente!`
                    }
                );
            });
    }

    /**
     * Alert method login.
     * @param alert
     */
    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    /**
     * Clear fields form.
     */
    clearFields() {
        this.email = null;
        this.password = null;
    }

    /**
     * Get reference uid user.
     */
    getUid() {
        let permission;
        let nameUser;
        const refBarber = firebase.database().ref().child('users/').orderByChild('uid').equalTo(this.userUid);
        refBarber.on('value', resp => {
            this.arrayBarber = [];
            this.arrayBarber = snapshotToArray(resp);
            permission = this.arrayBarber[0].acessLevel;
            nameUser = this.arrayBarber[0].name;
            localStorage.setItem('permission', permission);
            localStorage.setItem('name', nameUser);
            if (permission && nameUser) {
                if (permission !== 'adm') {
                    this.alerts = [];
                    localStorage.clear();
                    this.alerts.push(
                        {
                            id: 1,
                            type: 'danger',
                            message: `Você não tem permissão para acessar o sistema!`
                        }
                    );
                } else {
                    this.router.navigate(['/dashboard']);
                }
            }
        });
    }
}
