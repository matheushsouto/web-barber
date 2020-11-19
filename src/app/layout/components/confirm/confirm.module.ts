import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmComponent} from './confirm.component';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [CommonModule, NgbModule,],
    declarations: [ConfirmComponent],
    exports: [ConfirmComponent],
    bootstrap: [ConfirmComponent]
})
export class ConfirmModule {
}
