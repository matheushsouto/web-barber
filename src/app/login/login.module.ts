import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import {FormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [CommonModule, TranslateModule, LoginRoutingModule, FormsModule, NgbAlertModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
