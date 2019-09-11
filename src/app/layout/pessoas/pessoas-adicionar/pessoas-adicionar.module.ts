import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasAdicionarRoutingModule } from './pessoas-adicionar-routing.module';
import { PessoasAdicionarComponent } from './pessoas-adicionar.component';
import { PageHeaderModule } from '../../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Date Picker
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material';
import { MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        PessoasAdicionarRoutingModule,
        PageHeaderModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PessoasAdicionarComponent
    ]
})
export class PessoasAdicionarModule { }
