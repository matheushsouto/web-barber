import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {snapshotToArrayHour} from '../hours/form.component';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    hours;
    dates;
    dateForm: FormGroup;
    date;
    refDatesPush = firebase.database().ref('dates/');

    constructor(
        private formBuilder: FormBuilder,
        private route: Router
    ) {
        this.loadDateForm();
    }

    ngOnInit() {
        this.loadHours();
        this.loadDates();
    }

    /**
     * Load hours saved.
     */
    loadHours() {
        firebase.database().ref('hours/').on('value', resp => {
            this.hours = [];
            this.hours = snapshotToArrayHour(resp);
        });
    }

    /**
     * Load dates saved.
     */
    loadDates() {
        firebase.database().ref('dates').on('value', resp => {
            this.dates = [];
            this.dates = snapshotToArray(resp);
            this.hours.forEach(hour => {
                this.dates.forEach(function (date, i) {
                    if (hour.key === date.hour) {
                        date.startTime = hour.startTime;
                        date.endTime = hour.endTime;
                    }
                });
            });
        });
    }

    /**
     * Initialize date form.
     */
    loadDateForm() {
        this.dateForm = this.formBuilder.group({
            'hour': [null, Validators.required],
            'dateSelected': [null],
            'available': [true]
        });
    }

    /**
     * Save form.
     */
    saveDate() {
        this.refDatesPush.push().set(this.dateForm.value);
        this.dateForm.reset();
    }


    /**
     * Delete date selected.
     * @param event
     */
    deleteDate(event) {
        if (event.confirm) {
            firebase.database().ref('dates/' + event.id).remove();
        }
    }

    /**
     * Edit date selected.
     * @param date
     */
    editDate(date) {
        console.log(date);
        this.route.navigate(['datas/open/', date]);
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
