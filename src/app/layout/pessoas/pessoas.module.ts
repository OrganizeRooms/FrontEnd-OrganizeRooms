import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, PessoasRoutingModule, PageHeaderModule],
    declarations: [PessoasComponent]
})
export class PessoasModule {}
