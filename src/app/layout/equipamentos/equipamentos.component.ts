import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-equipamentos',
    templateUrl: './equipamentos.component.html',
    styleUrls: ['./equipamentos.component.scss'],
    //animations: [routerTransition()]
})
export class EquipamentosComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
