import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
    {
        path: '',
        component: FormComponent
    },
    {
        path: 'open/:user',
        component: EditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule {}
