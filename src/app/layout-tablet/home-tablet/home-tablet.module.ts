import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Modules
import { HomeTabletRoutingModule } from './home-tablet-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Components
import { HomeTabletComponent } from './home-tablet.component';

@NgModule({
    imports: [
        CommonModule,
        HomeTabletRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        HomeTabletComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class HomeTabletModule { }
