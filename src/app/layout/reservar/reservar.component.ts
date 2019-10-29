import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n } from 'src/app/shared/utils';
import { UnidadeService, OrganizeRoomsService, StorageService, SalaService } from 'src/app/shared';
import { Time } from 'aws-sdk/clients/dlm';

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

        this.formVerificacao = this.formBuilder.group({
            valido: ['', Validators.required]
        });
        /*
        this.formAgendar = this.formBuilder.group({
            //secondCtrl: ['', Validators.required]
        });*/

        this.carregarUnidades();
    }

    ngOnDestroy() {
        this.formVerificacao = null;
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

    next(stepper) {

        stepper.next()
    }

    limpar() {
        window.location.reload()
    }

    log(sala) {
        console.log(sala)
        console.log("----")
        console.log(this.selUnidade)
    }

}

