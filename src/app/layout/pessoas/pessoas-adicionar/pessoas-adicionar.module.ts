import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasAdicionarRoutingModule } from './pessoas-adicionar-routing.module';
import { PessoasAdicionarComponent } from './pessoas-adicionar.component';
import { PageHeaderModule } from '../../../shared';

@NgModule({
    imports: [CommonModule, PessoasAdicionarRoutingModule, PageHeaderModule],
    declarations: [PessoasAdicionarComponent]
})
export class PessoasAdicionarModule {}
