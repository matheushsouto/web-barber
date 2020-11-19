import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    userForm: FormGroup;
    users = [];
    name;
    email;
    password;
    acessLevel;
    user;
    uidUsers;
    phone;

    constructor(
        private formBuilder: FormBuilder,
        public afAuth: AngularFireAuth,
        private route: Router
    ) {
        this.loadUserForm();
    }

    ngOnInit() {
        this.loadUser();
    }

    /**
     * Initialize user form.
     */
    loadUserForm() {
        this.userForm = this.formBuilder.group({
            'name': [null, Validators.required],
            'phone': [null, Validators.required],
            'email': [null, Validators.required],
            'password': [null, Validators.required],
            'acessLevel': [null, Validators.required],
            'uid': this.uidUsers
        });
    }

    /**
     * Save form.
     */
    async saveUser() {
        this.uidUsers = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password).then(function (userRecord) {
            return userRecord.user.uid;
        });
        const requestUid = {
            name: this.name,
            phone: this.phone,
            email: this.email,
            acessLevel: this.acessLevel,
            uid: this.uidUsers,
        };
        const saveUser = firebase.database().ref('users/').push().set(requestUid);
        this.clearFields();
        this.userForm.reset();
    }

    /**
     * Clear fields.
     */
    clearFields() {
        this.userForm.reset();
    }

    /**
     * Load users saved.
     */
    loadUser() {
        const refBarber = firebase.database().ref('users/');
        refBarber.on('value', resp => {
            this.users = [];
            this.users = snapshotToArray(resp);
        });
    }

    /**
     * Edit user selected.
     * @param user
     */
    editUser(user) {
        this.route.navigate(['usuarios/open/', user]);
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
