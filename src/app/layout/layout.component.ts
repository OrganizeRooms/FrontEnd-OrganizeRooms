import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;

    constructor(
        private storageServide: StorageService,
        private router: Router
    ) { }

    ngOnInit() {
        if (this.storageServide.getLocalUser().logado == false
            || this.storageServide.getLocalUser().pessoa == ''
            || this.storageServide.getLocalUser().pessoa == null) {
            this.router.navigate(['/login']);
        }
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
