import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PageHeaderModule} from './../../shared';
import {FormRoutingModule} from './form-routing.module';
import {FormComponent} from './form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmModule} from '../components/confirm/confirm.module';
import {EditComponent} from './edit/edit.component';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule, ReactiveFormsModule, ConfirmModule],
    declarations: [FormComponent, EditComponent]
})
export class FormModule {
}
