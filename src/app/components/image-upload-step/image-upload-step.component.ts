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
import { LocalStorageService } from "../../commons/local-storage.service";

@Component({
  selector: "image-upload-step[model]",
  templateUrl: "./image-upload-step.component.html",
  styleUrls: ["./image-upload-step.component.scss"],
})
export class ImageUploadStepComponent implements OnInit {
  @Input() model!: BoardModel;
  public boardImage = new Image();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialogService: DialogService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    this.boardImage.src = this.model.image.src;
    this.boardImage.onload = () => this.onImageLoad();
  }

  public onDeleteClicked() {
    this.resetImage();
  }

  private resetImage() {
    this.boardImage = new Image();
    this.boardImage.onload = () => this.onImageLoad();
    this.model.image.src = "";
    this.localStorageService.removeData("boardImage");
    this.changeDetectorRef.detectChanges();
  }

  public get isImageLoadedCorrectly() {
    return Boolean(
      this.boardImage.complete && this.boardImage.naturalHeight !== 0,
    );
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

    this.boardImage.src = window.URL.createObjectURL(file);
  }

  public onImageLoad() {
    if (!this.isImageLoadedCorrectly) {
      this.dialogService.openAlert(
        "Falha ao carregar imagem",
        "Por favor tente novamente",
      );
      this.resetImage();
      return;
    }

    if (this.boardImage.naturalWidth === this.boardImage.naturalHeight) {
      this.localStorageService.saveImage("boardImage", this.boardImage);
      this.model.image.src =
        this.localStorageService.getImage("boardImage")?.src ?? "";
      this.model.image.onload = () => this.changeDetectorRef.markForCheck();
      return;
    }

    this.dialogService.openAlert(
      "Imagem de tamanho inválido.",
      "A imagem do tabuleiro deve ser quadrada, a imagem selecionada possue o tamanho: " +
        this.boardImage.naturalWidth +
        "x" +
        this.boardImage.naturalHeight +
        ".",
    );
    this.resetImage();
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
