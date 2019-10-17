import { Component, OnInit } from '@angular/core';
import { StorageService } from './shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    constructor(
        private storageServide: StorageService,
        private router: Router
    ) {}

    ngOnInit() {
    }
}
