import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './shared/_services';
import { User } from './shared/_models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    //currentUser: User;

    constructor(
        //private router: Router,
        //private authenticationService: AuthenticationService
    ) {
       // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    
}
