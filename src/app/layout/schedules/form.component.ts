import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    schedules;
    users;

    constructor(
        private formBuilder: FormBuilder,
        private route: Router
    ) {
    }

    ngOnInit() {
        this.loadUsers();
        this.loadSchedules();
    }

    /**
     * Load schedules saved.
     */
    loadSchedules() {
        firebase.database().ref('mySchedules/').on('value', resp => {
            this.schedules = [];
            this.schedules = snapshotToArrayHour(resp);
            this.users.forEach(user => {
                this.schedules.forEach(function (schedule, i) {
                    if (user.uid == schedule.uid) {
                        schedule.client = user.name;
                    }
                });
            });
        });
    }

    /**
     * Delete schedule selected.
     * @param event
     * @param schedule
     */
    deleteSchedule(event, schedule) {
        if (event.confirm) {
            firebase.database().ref('mySchedules/' + event.id).remove();
            firebase.database().ref().child('dates/' + schedule.dateKey).update({available: true});
        }
    }

    /**
     * Load users saved.
     */
    loadUsers() {
        firebase.database().ref('users/').on('value', resp => {
            this.users = [];
            this.users = snapshotToArrayHour(resp);
        });
    }
}

export const snapshotToArrayHour = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
