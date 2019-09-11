import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservarRoutingModule } from './reservar-routing.module';
import { ReservarComponent } from './reservar.component';
import { PageHeaderModule } from '../../../shared';

import { MatFormFieldModule, MatStepperModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    imports: [
        CommonModule,
        ReservarRoutingModule,
        PageHeaderModule,
        MatStepperModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    declarations: [
        ReservarComponent
    ]
    /** ,
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [
        ReservarComponent
    ]*/
})
export class ReservarModule { }
