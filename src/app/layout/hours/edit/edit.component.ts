import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {snapshotToArray} from '../../date/form.component';

@Component({
    selector: 'app-chat',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    hour;
    form: FormGroup;
    objHour;
    id;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private db: AngularFireDatabase,
        private router: Router
    ) {
        this.initialize();
        this.createForm();
    }

    ngOnInit() {
    }

    /**
     * Initialize form.
     */
    createForm() {
        this.form = this.formBuilder.group({
            startTime: [this.objHour.startTime, Validators.required],
            endTime: [this.objHour.endTime, Validators.required]
        });
    }

    /**
     * Load items.
     */
    initialize() {
        let key;
        let startTime;
        let endTime;

        this.id = this.route.snapshot.paramMap.get('hour');
        const refReq = firebase.database().ref().child('hours/').orderByKey().equalTo(this.id);
        refReq.on('value', resp => {
            this.hour = snapshotToArray(resp);
        });
        this.hour.forEach(resp => {
            key = resp.key;
            startTime = resp.startTime;
            endTime = resp.endTime;
        });
        this.objHour = {
            key: key,
            startTime: startTime,
            endTime: endTime
        };
    }

    saveUpdate() {
        firebase.database().ref().child('hours/' + this.id).update( this.form.value);
        this.router.navigate(['horarios']);
    }
}
