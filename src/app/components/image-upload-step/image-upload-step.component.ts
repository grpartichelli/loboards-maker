import { Component, NgModule, ChangeDetectorRef, Input } from "@angular/core";
import { NgOptimizedImage, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogService } from "../../commons/dialog.service";
import { BoardModel } from "../../models/board.model";

@Component({
  selector: "image-upload-step[model]",
  templateUrl: "./image-upload-step.component.html",
  styleUrls: ["./image-upload-step.component.scss"],
})
export class ImageUploadStepComponent {
  @Input() model!: BoardModel;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialogService: DialogService,
  ) {}

  public onDeleteClicked() {
    this.resetImage();
  }

  private resetImage() {
    this.model.image = new Image();
    this.changeDetectorRef.detectChanges();
  }

  public onImageUpload(event: any) {
    const files = event.target.files;
    if (event.target.files === 0) {
      return;
    }
    const file = files[0];

    if (file.type.match(/image\/*/) == null) {
      return;
    }

    this.model.image.src = window.URL.createObjectURL(file);
    this.model.image.onload = () => {
      if (!this.model.isImageLoadedCorrectly) {
        this.dialogService.openAlert(
          "Falha ao carregar imagem",
          "Por favor tente novamente",
        );
        this.resetImage();
        return;
      }

      if (this.model.image.naturalWidth === this.model.image.naturalHeight) {
        this.changeDetectorRef.detectChanges();
        return;
      }

      this.dialogService.openAlert(
        "Imagem de tamanho inválido.",
        "A imagem do tabuleiro deve ser quadrada, a imagem selecionada possue o tamanho: " +
          this.model.image.naturalWidth +
          "x" +
          this.model.image.naturalHeight +
          ".",
      );
      this.resetImage();
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
