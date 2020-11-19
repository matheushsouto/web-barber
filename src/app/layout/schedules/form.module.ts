import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditComponent} from './edit/edit.component';
import { NgxCurrencyModule } from 'ngx-currency';
import {ConfirmModule} from '../components/confirm/confirm.module';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule, ReactiveFormsModule, NgxCurrencyModule, ConfirmModule],
    declarations: [FormComponent, EditComponent]
})
export class FormModule {}
