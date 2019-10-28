import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NgbDropdownModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent
    ],
    providers: [
    ]
})
export class LayoutModule { }
