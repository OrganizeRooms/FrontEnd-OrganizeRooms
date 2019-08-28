import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-salas',
    templateUrl: './salas.component.html',
    styleUrls: ['./salas.component.scss'],
    //animations: [routerTransition()]
})
export class SalasComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
