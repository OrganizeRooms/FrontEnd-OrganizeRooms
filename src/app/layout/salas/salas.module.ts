import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalasRoutingModule } from './salas-routing.module';
import { SalasComponent } from './salas.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, SalasRoutingModule, PageHeaderModule],
    declarations: [SalasComponent]
})
export class SalasModule {}
