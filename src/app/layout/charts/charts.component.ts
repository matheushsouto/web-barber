import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {

    public listUsers;

    constructor() {
        const user = firebase.auth().currentUser.uid;
        localStorage.setItem('user', user);
    }

    ngOnInit() {
        this.loadUser();
    }

    /**
     * Load users system.
     */
    loadUser() {
        const refReq = firebase.database().ref().child('users/');
        refReq.on('value', resp => {
            this.listUsers = [];
            this.listUsers = snapshotToArray(resp);
        });
    }
}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
