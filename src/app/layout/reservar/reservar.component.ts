import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n } from 'src/app/shared/utils';
import { UnidadeService, OrganizeRoomsService, StorageService, SalaService } from 'src/app/shared';

@Component({
    selector: 'app-reservar',
    templateUrl: './reservar.component.html',
    styleUrls: ['./reservar.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n } // define custom NgbDatepickerI18n provider
    ]
})
export class ReservarComponent implements OnInit, OnDestroy {

    isLinear = false;
    formVerificacao: FormGroup;
    formAgendar: FormGroup;
    formUnidade: FormGroup;

    listUnidades;
    selUnidade;//= new FormControl(this.storageService.getLocalUser().pessoa.pesUnidade);
    lotacao;
    data: NgbDateStruct;
    horaInicio;
    horaFim;

    // salas
    listSalas = null;
    selSala = null;

    constructor(
        private formBuilder: FormBuilder,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private storageService: StorageService,
        private salaService: SalaService
    ) { }

    ngOnInit() {
      //  this.carregarSalas();

        /*
        this.formUnidade = this.formBuilder.group({
            dataVali: ['', Validators.required]
        });
        this.formAgendar = this.formBuilder.group({
            //secondCtrl: ['', Validators.required]
        });*/

        this.carregarUnidades();
    }

    ngOnDestroy() {
        this.formUnidade = null;
        this.formAgendar = null;
        this.listUnidades = null;
        this.data = null;
    }

    carregarUnidades() {
        this.unidadeService.buscarUnidadesAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    carregarSalas() {
        this.salaService.buscarTodasSalas().subscribe(ret => {
            if (ret.data != null || ret.data != '') {
                this.listSalas = ret.data;
            } else {
                this.listSalas = '';
            }
        });
    }

    filtrarSalas() {
        this.salaService.buscarTodasSalas().subscribe(ret => {
            if (ret.data != null || ret.data != '') {
                this.listSalas = ret.data;
            } else {
                this.listSalas = '';
            }
        });
    }

    next(stepper) {

        stepper.next()
    }

    log(sala) {
        console.log(sala)
        console.log("----")
        console.log(this.selUnidade)
    }

}

