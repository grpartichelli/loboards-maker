import { Component, NgModule, Input, Inject } from "@angular/core";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";

export class DialogData {
  constructor(
    public title: string,
    public description: string,
    public type: DialogType,
  ) {}
}

export enum DialogType {
  ALERT,
  CONFIRMATION,
}

@Component({
  selector: "simple-dialog",
  templateUrl: "./simple-dialog.component.html",
  styleUrls: ["./simple-dialog.component.scss"],
})
export class SimpleDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<SimpleDialogComponent, boolean>,
  ) {}

  public get isAlert(): boolean {
    return this.data.type === DialogType.ALERT;
  }

  public get isConfirmation(): boolean {
    return this.data.type === DialogType.CONFIRMATION;
  }

  public onCancelClicked(): void {
    this.dialogRef.close(false);
  }

  public onConfirmClicked(): void {
    this.dialogRef.close(true);
  }
}

@NgModule({
  declarations: [SimpleDialogComponent],
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  exports: [SimpleDialogComponent],
})
export class SimpleDialogModule {}
