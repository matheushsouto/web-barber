import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    hours;
    hourForm: FormGroup;
    refHoursPush = firebase.database().ref('hours/');

    constructor(
        private formBuilder: FormBuilder,
        private route: Router
    ) {
        this.loadHourForm();
    }

    ngOnInit() {
        this.loadHour();
    }

    /**
     * Load hours saved.
     */
    loadHour() {
        firebase.database().ref('hours/').on('value', resp => {
            this.hours = [];
            this.hours = snapshotToArrayHour(resp);
        });
    }

    /**
     * Initialize hour form.
     */
    loadHourForm() {
        this.hourForm = this.formBuilder.group({
            'startTime': [null, Validators.required],
            'endTime': [null, Validators.required],
        });
    }

    /**
     * Save form.
     */
    saveHour() {
        this.refHoursPush.push().set(this.hourForm.value);
        this.hourForm.reset();

    }

    /**
     * Delete hour selected.
     * @param event
     */
    deleteHour(event) {
        if (event.confirm) {
            firebase.database().ref('hours/' + event.id).remove();
        }
    }

    /**
     * Edit hour selected.
     *
     * @param hour
     */
    editHour(hour) {
        this.route.navigate(['horarios/open/', hour]);
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
