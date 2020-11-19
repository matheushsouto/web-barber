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
    news;
    newsForm: FormGroup;
    refNewsPush = firebase.database().ref('news/');

    constructor(
        private formBuilder: FormBuilder,
        private route: Router
    ) {
        this.loadNewsForm();
    }

    ngOnInit() {
        this.loadNews();
    }

    /**
     * Load News saved.
     */
    loadNews() {
        firebase.database().ref('news/').on('value', resp => {
            this.news = [];
            this.news = snapshotToArrayHour(resp);
        });
    }

    /**
     * Initialize News form.
     */
    loadNewsForm() {
        this.newsForm = this.formBuilder.group({
            'title': [null, Validators.required],
            'body': [null, Validators.required],
            'link': [null, Validators.required],
        });
    }

    /**
     * Save form.
     */
    saveNews() {
        this.refNewsPush.push().set(this.newsForm.value);
        this.newsForm.reset();

    }

    /**
     * Delete news selected.
     * @param event
     */
    deleteNews(event) {
        if (event.confirm) {
            firebase.database().ref('news/' + event.id).remove();
        }
    }

    /**
     * Edit news selected.
     * @param hour
     */
    editNews(hour) {
        this.route.navigate(['noticias/edit/', hour]);
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
