import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditComponent} from './edit/edit.component';
import { NgxCurrencyModule } from 'ngx-currency';
import {ConfirmModule} from '../components/confirm/confirm.module';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule, ReactiveFormsModule, NgxCurrencyModule, ConfirmModule, FormsModule, NgbDatepickerModule],
    declarations: [FormComponent, EditComponent]
})
export class FormModule {}
