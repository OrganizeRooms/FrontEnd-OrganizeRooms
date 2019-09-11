import { Injectable } from '@angular/core';

@Injectable()
export class OrganizeRooms {

    private value;

    constructor() { }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

}
