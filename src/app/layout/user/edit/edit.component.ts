import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {snapshotToArray} from '../form.component';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
    selector: 'app-chat',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    user;
    form: FormGroup;
    objUser;
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
            name: [this.objUser.name, Validators.required],
            email: [this.objUser.email, Validators.required],
            acessLevel: [this.objUser.acessLevel, Validators.required],
        });
    }

    /**
     * Load items.
     */
    initialize() {
        let key;
        let name;
        let email;
        let password;
        let acessLevel;
        let percentage;

        this.id = this.route.snapshot.paramMap.get('user');
        const refReq = firebase.database().ref().child('users/').orderByKey().equalTo(this.id);
        refReq.on('value', resp => {
            this.user = snapshotToArray(resp);
            console.log(this.user);
        });

        this.user.forEach(resp => {
            key = resp.key;
            name = resp.name;
            email = resp.email;
            password = resp.password;
            acessLevel = resp.acessLevel;
            percentage = resp.percentage;
        });
        this.objUser = {
            key: key,
            name: name,
            email: email,
            password: password,
            acessLevel: acessLevel,
            percentage: percentage
        };
    }

    /**
     * Update user.
     */
    saveUpdate() {
        firebase.database().ref().child('users/' + this.id).update(this.form.value);
        this.router.navigate(['usuarios']);
    }
}
