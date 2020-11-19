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
    news;
    form: FormGroup;
    objNews;
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
            title: [this.objNews.title, Validators.required],
            body: [this.objNews.body, Validators.required],
            link: [this.objNews.link, Validators.required]
        });
    }

    /**
     * Load items.
     */
    initialize() {
        let title;
        let body;
        let link;

        this.id = this.route.snapshot.paramMap.get('new');

        const refReq = firebase.database().ref().child('news/').orderByKey().equalTo(this.id);
        refReq.on('value', resp => {
            this.news = snapshotToArray(resp);
        });
        this.news.forEach(resp => {
            title = resp.title;
            body = resp.body;
            link = resp.link;
        });
        this.objNews = {
            title: title,
            body: body,
            link: link
        };
    }

    /**
     * Update news.
     */
    saveUpdate() {
        firebase.database().ref().child('news/' + this.id).update( this.form.value);
        this.router.navigate(['noticias']);
    }
}
