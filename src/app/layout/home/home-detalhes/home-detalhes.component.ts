import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  id: number,
  sala: string,
  unidade: string,
  responsavel: string,
  assunto: string,
  data: string,
  hrInicio: string,
  hrFim: string,
  status: string,
  descricao: string,
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
