import { Component, NgModule, ChangeDetectorRef } from "@angular/core";
import { NgOptimizedImage, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { SimpleDialogComponent } from "../confirmation-dialog/simple-dialog.component";
import { DialogService } from "../../commons/dialog.service";

@Component({
  selector: "image-upload-step",
  templateUrl: "./image-upload-step.component.html",
  styleUrls: ["./image-upload-step.component.scss"],
})
export class ImageUploadStepComponent {
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialogService: DialogService,
  ) {}
  public image = new Image();

  public onImageUpload(event: any) {
    const files = event.target.files;
    if (event.target.files === 0) {
      return;
    }
    const file = files[0];

    if (file.type.match(/image\/*/) == null) {
      return;
    }

    this.image.src = window.URL.createObjectURL(file);
    this.image.onload = () => {
      if (this.image.naturalWidth !== this.image.naturalHeight) {
        this.dialogService.openAlert(
          "Imagem de tamanho inválido.",
          "A imagem do tabuleiro deve ser quadrada, a imagem selecionada possue o tamanho: " +
            this.image.naturalWidth +
            "x" +
            this.image.naturalHeight +
            ".",
        );
        this.image = new Image();
      }
      this.changeDetectorRef.detectChanges();
    };
  }
}

@NgModule({
  declarations: [ImageUploadStepComponent],
  imports: [
    NgOptimizedImage,
    NgIf,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatDialogModule,
  ],
  exports: [ImageUploadStepComponent],
})
export class ImageUploadStepModule {}
