import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n, NgbDateCustomParserFormatter } from 'src/app/shared/utils';
import { UnidadeService, OrganizeRoomsService, StorageService, SalaService } from 'src/app/shared';
import { MatStepper } from '@angular/material';

@Component({
    selector: 'app-reservar',
    templateUrl: './reservar.component.html',
    styleUrls: ['./reservar.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // define custom NgbDatepickerI18n provider
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } // define custom Date Format provider
    ]
})
export class ReservarComponent implements OnInit, OnDestroy {

    isLinear = false;
    formAgendar: FormGroup;

    listUnidades;
    selUnidade = null;//= new FormControl(this.storageService.getLocalUser().pessoa.pesUnidade);
    lotacao;
    data: NgbDateStruct;
    horaInicio = { hour: 0, minute: 0, second: 0 };
    horaFim = { hour: 0, minute: 0, second: 0 };

    // salas
    listSalas = null;
    selSala = null;

    filtrarValido: Boolean;
    apareceFiltrar = true;

    constructor(
        private formBuilder: FormBuilder,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private storageService: StorageService,
        private salaService: SalaService
    ) { }

    ngOnInit() {
        //  this.carregarSalas();

        this.formAgendar = this.formBuilder.group({
            valido: [null, Validators.required]
        });

        /*
        this.formAgendar = this.formBuilder.group({
            //secondCtrl: ['', Validators.required]
        });*/

        this.carregarUnidades();
    }

    ngOnDestroy() {
        this.formAgendar = null;
        this.listUnidades = null;
        this.data = null;
        this.selUnidade = null
        this.lotacao = null;
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

        console.log('- filtarValido: ' + this.filtrarValido)
        this.filtrarValido = this.verificarCampos();

        console.log('- filtarValido após o ELSE: ' + this.filtrarValido)

        if (this.filtrarValido) {
            var nhoraInicio = new Date(this.data.year, this.data.month, this.data.day,
                this.horaInicio.hour, this.horaInicio.minute, this.horaInicio.second);

            var nhoraFim = new Date(this.data.year, this.data.month, this.data.day,
                this.horaFim.hour, this.horaFim.minute, this.horaFim.second);

            this.salaService.buscarTodasSalas().subscribe(ret => {
                if (ret.data != null && ret.data != '') {
                    this.listSalas = ret.data;
                } else {
                    this.listSalas = '';
                }
            });
            console.log('- filtarValido após buscar: ' + this.filtrarValido)
            this.apareceFiltrar = false;
        }
    }

    next(stepper) {
        // complete the current step
        stepper.selected.completed = true;
        // move to next step
        stepper.next();
    }

    limpar() {
        window.location.reload()
    }

    log(sala) {
        console.log(sala)
        console.log("----")
        console.log(this.selUnidade)
    }

    verificarCampos(): Boolean {

        var mfiltrarValido = false;

        if (!this.selUnidade) {
            alert('Informe a Unidade!')

        } else if (!this.data) {
            alert('Informe uma Data!')

        } else if (this.horaFim.hour != 0 && this.horaFim.minute != 0
            && this.horaInicio.hour == null && this.horaInicio.minute == null) {
            alert('Informe uma Hora Inicio!')

        } else if (this.horaInicio.hour != 0 && this.horaInicio.minute != 0
            && this.horaFim.hour == null && this.horaFim.minute == null) {
            alert('Informe uma Hora Fim!')

        } else if ((this.horaInicio.hour >= this.horaFim.hour && this.horaInicio.minute >= this.horaFim.minute)
            && (this.horaInicio.hour != 0 && this.horaInicio.minute != 0 && this.horaFim.hour != 0 && this.horaFim.minute != 0)) {
            alert('Informe uma "Hora Fim" MAIOR que a "Hora Inicio"!')

        } else {
            mfiltrarValido = true
        }
        return mfiltrarValido
    }

}

