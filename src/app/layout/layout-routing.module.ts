import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthGuardPermission} from '../shared/guard-permission';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
            {path: 'dashboard', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule)},
            {path: 'horarios', loadChildren: () => import('./hours/form.module').then((m) => m.FormModule), canActivate: [AuthGuardPermission]},
            {path: 'datas', loadChildren: () => import('./date/form.module').then((m) => m.FormModule), canActivate: [AuthGuardPermission]},
            {path: 'noticias', loadChildren: () => import('./news/form.module').then((m) => m.FormModule), canActivate: [AuthGuardPermission]},
            {path: 'usuarios', loadChildren: () => import('./user/form.module').then((m) => m.FormModule) , canActivate: [AuthGuardPermission]},
            {path: 'agendamentos', loadChildren: () => import('./schedules/form.module').then((m) => m.FormModule) , canActivate: [AuthGuardPermission]},
            {path: 'app', loadChildren: () => import('./app-barber/form.module').then((m) => m.FormModule) , canActivate: [AuthGuardPermission]},
         ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
