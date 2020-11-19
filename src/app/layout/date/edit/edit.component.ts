import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {snapshotToArray} from '../form.component';
import {AngularFireDatabase} from '@angular/fire/database';
import {snapshotToArrayHour} from '../../hours/form.component';

@Component({
    selector: 'app-chat',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    day;
    hours;
    form: FormGroup;
    id;
    arrayDay = [
        {'name': 'Domingo', 'selected': false},
        {'name': 'Segunda', 'selected': false},
        {'name': 'Terça', 'selected': false},
        {'name': 'Quarta', 'selected': false},
        {'name': 'Quinta', 'selected': false},
        {'name': 'Sexta', 'selected': false},
        {'name': 'Sabado', 'selected': false},
    ];

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private db: AngularFireDatabase,
        private router: Router
    ) {
        this.initialize();
    }

    ngOnInit() {

    }

    /**
     * Load items.
     */
    initialize() {
        let key;
        let keyHour;
        let day;

        this.id = this.route.snapshot.paramMap.get('date');
        console.log(this.id);

        const refReqDate = firebase.database().ref().child('dates/').orderByKey().equalTo(this.id);

        refReqDate.on('value', resp => {
            this.day = snapshotToArray(resp);
        });
        this.day.forEach(resp => {
            key = resp.key;
            day = resp.day;
            keyHour = resp.hour;
        });

        this.arrayDay.forEach(function (resp, i) {
            if (resp.name === day) {
                resp.selected = true;
            }
        });

        firebase.database().ref('hours/').on('value', resp => {
            this.hours = [];
            this.hours = snapshotToArrayHour(resp);
            this.hours.forEach(function (item, i) {
                if (item.key === keyHour) {
                    item.selected = true;
                }
            });
        });
    }

    /**
     * Update date.
     */
    saveUpdate() {
        const objUpdate = {
            day: this.arrayDay.filter(day => day.selected === true),
            hour: this.hours.filter(hour => hour.selected === true),
        };
    }
}
