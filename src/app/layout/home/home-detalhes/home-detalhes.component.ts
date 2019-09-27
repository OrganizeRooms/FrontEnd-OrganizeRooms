import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  ageId: number,
  sala: string,
  pessoa_responsavel: string,
  unidade: string,
  ageAssunto: string,
  ageData: string,
  ageHoraInicio: string,
  ageHoraFim: string,
  ageStatus: string,
  ageDescricao: string,
}

@Component({
  selector: 'app-home-detalhes',
  templateUrl: './home-detalhes.component.html',
  styleUrls: ['./home-detalhes.component.scss']
})
export class HomeDetalhesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HomeDetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    //this.dialogRef.updateSize('80%', '80%');
  }
}
