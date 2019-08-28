import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-pessoas',
    templateUrl: './pessoas.component.html',
    styleUrls: ['./pessoas.component.scss'],
    //animations: [routerTransition()]
})
export class PessoasComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
