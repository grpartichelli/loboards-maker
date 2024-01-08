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
import { DialogService } from "../../services/dialog.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { BoardCreatorState } from "../board-creator/states/board-creator.state";
import { BoardModel } from "../../models/board.model";
import { BoardConfig } from "../../models/board.config";
import { FileService } from "../../services/file.service";

@Component({
  selector: "board-select-step[state]",
  templateUrl: "./board-select-step.component.html",
  styleUrls: ["./board-select-step.component.scss"],
})
export class BoardSelectStepComponent implements OnInit {
  @Input() state!: BoardCreatorState;
  public boardImage = new Image();
  public isLoaded = true;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialogService: DialogService,
    private readonly fileService: FileService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    this.loadBoardImage();
  }

  private loadBoardImage(): void {
    this.boardImage.src = this.state.model.image.src;
    this.boardImage.onload = () => this.onImageLoad();
    this.reset();
  }

  private reset() {
    // HACK: Reloads everything upon delete
    this.isLoaded = false;
    this.changeDetectorRef.detectChanges();
    this.isLoaded = true;
    this.changeDetectorRef.detectChanges();
  }

  public onDeleteClicked() {
    this.resetImage();
  }

  private resetImage() {
    this.boardImage = new Image();
    this.boardImage.onload = () => this.onImageLoad();
    this.state.model = new BoardModel();
    this.localStorageService.clearData();
    this.reset();
  }

  public get isImageLoadedCorrectly() {
    return Boolean(
      this.boardImage.complete && this.boardImage.naturalHeight !== 0,
    );
  }

  public onBoardConfigUpload(event: any) {
    const textFile = this.fileService.readTextFile(event);
    if (!textFile) {
      this.displayTextFileAlert();
      return;
    }

    textFile.text().then((text: string) => {
      try {
        const boardConfig = JSON.parse(text) as BoardConfig;
        this.state.model = BoardModel.fromBoardConfig(boardConfig);
        this.loadBoardImage();
      } catch (error) {
        this.displayTextFileAlert();
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  private displayTextFileAlert() {
    this.dialogService.openAlert(
      "Falha ao carregar configuração",
      "Por favor tente novamente",
    );
  }

  public onImageUpload(event: any) {
    const file = this.fileService.readImageFile(event);
    if (!file) {
      this.displayImageFileAlert();
      return;
    }
    this.boardImage.src = window.URL.createObjectURL(file);
  }

  private displayImageFileAlert() {
    this.dialogService.openAlert(
      "Falha ao carregar imagem",
      "Por favor tente novamente",
    );
  }

  public onImageLoad() {
    if (!this.isImageLoadedCorrectly) {
      this.displayImageFileAlert();
      this.resetImage();
      return;
    }

    if (this.boardImage.naturalWidth === this.boardImage.naturalHeight) {
      this.state.model.image.src = this.resolveBase64Source(this.boardImage);
      this.state.model.image.onload = () =>
        this.changeDetectorRef.markForCheck();
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

  private resolveBase64Source(img: HTMLImageElement): string {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return "";
    }

    ctx.drawImage(img, 0, 0);
    canvas.remove();
    return canvas.toDataURL("image/png");
  }
}

@NgModule({
  declarations: [BoardSelectStepComponent],
  imports: [
    NgOptimizedImage,
    NgIf,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
  ],
  exports: [BoardSelectStepComponent],
})
export class BoardSelectStepModule {}
