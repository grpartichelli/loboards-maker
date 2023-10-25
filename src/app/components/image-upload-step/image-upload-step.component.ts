import {
  Component,
  NgModule,
  ChangeDetectorRef,
  Input,
  OnInit,
} from "@angular/core";
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
export class ImageUploadStepComponent implements OnInit {
  @Input() model!: BoardModel;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    if (this.model.image.src) {
      this.model.image.onload = () => {
        this.validateImageSize();
      };
    }
  }

  public get isImageVisible(): boolean {
    return Boolean(this.model.image.src);
  }

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
      if (!this.validateImageSize()) {
        this.dialogService.openAlert(
          "Falha ao carregar imagem",
          "Por favor tente novamente",
        );
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

  private validateImageSize(): boolean {
    if (!this.model?.image?.naturalHeight && !this.model?.image?.naturalWidth) {
      this.resetImage();
      return false;
    }
    return true;
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
