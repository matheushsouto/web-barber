import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import {PageHeaderModule, StatModule} from '../../shared';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import {NgbAlertModule, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, Ng2Charts, ChartsRoutingModule, PageHeaderModule, NgbCarouselModule, NgbAlertModule, StatModule],
    declarations: [ChartsComponent]
})
export class ChartsModule {}
