import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/shared';

@Component({
  selector: 'app-home-detalhes-v1',
  templateUrl: './home-detalhes-v1.component.html',
  styleUrls: ['./home-detalhes-v1.component.scss']
})
export class HomeDetalhesv1Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HomeDetalhesv1Component>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    //this.dialogRef.updateSize('80%', '80%');
  }
}
