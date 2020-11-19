import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {snapshotToArray} from '../user/form.component';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

    qrCode;
    imgCode;

    constructor(
        private route: Router
    ) {
    }

    ngOnInit() {
        this.initializeQrCode();
    }

    /**
     * Render qr-code in view.
     */
    initializeQrCode() {
        firebase.database().ref('app/').on('value', resp => {
            this.qrCode = [];
            this.qrCode = snapshotToArray(resp);
            this.qrCode.forEach(qr => {
                this.imgCode = qr.imgCode;
            });
        });
    }
}

