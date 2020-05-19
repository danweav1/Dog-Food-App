import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ingredients-dialog',
  templateUrl: './ingredients-dialog.component.html',
  styleUrls: ['./ingredients-dialog.component.css'],
})
export class IngredientsDialogComponent implements OnInit {
  name: string;
  ingredients: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<IngredientsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log(data);
    this.name = data.name;
    this.ingredients = data.ingredients;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
