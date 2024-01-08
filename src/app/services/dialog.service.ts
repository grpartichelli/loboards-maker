import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  SimpleDialogComponent,
  DialogType,
  DialogData,
} from "../components/confirmation-dialog/simple-dialog.component";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(private readonly matDialog: MatDialog) {}

  public openAlert(title: string, description: string): Promise<void> {
    return this.openSimpleDialog(title, description, DialogType.ALERT).then();
  }

  public openConfirmation(
    title: string,
    description: string,
  ): Promise<boolean> {
    return this.openSimpleDialog(title, description, DialogType.CONFIRMATION);
  }

  private openSimpleDialog(
    title: string,
    description: string,
    type: DialogType,
  ): Promise<boolean> {
    const config = {
      width: "450px",
      enterAnimationDuration: "150ms",
      exitAnimationDuration: "150ms",
      data: {
        title,
        description,
        type,
      },
    };

    return this.matDialog
      .open<SimpleDialogComponent, DialogData, boolean>(
        SimpleDialogComponent,
        config,
      )
      .afterClosed()
      .toPromise()
      .then((it) => Boolean(it));
  }
}
