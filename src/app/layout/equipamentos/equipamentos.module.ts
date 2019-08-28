import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipamentosRoutingModule } from './equipamentos-routing.module';
import { EquipamentosComponent } from './equipamentos.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, EquipamentosRoutingModule, PageHeaderModule],
    declarations: [EquipamentosComponent]
})
export class EquipamentosModule {}
