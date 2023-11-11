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
import { LocalStorageService } from "../../commons/local-storage.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { BoardCreatorState } from "../board-creator/states/board-creator.state";
import { BoardModel } from "../../models/board.model";

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
    private readonly localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    this.boardImage.src = this.state.model.image.src;
    this.boardImage.onload = () => this.onImageLoad();
  }

  public onDeleteClicked() {
    this.resetImage();
  }

  private resetImage() {
    this.boardImage = new Image();
    this.boardImage.onload = () => this.onImageLoad();
    this.state.model = new BoardModel();
    this.localStorageService.clearData();

    // HACK: Reloads everything upon delete
    this.isLoaded = false;
    this.changeDetectorRef.detectChanges();
    this.isLoaded = true;
    this.changeDetectorRef.detectChanges();
  }

  public get isImageLoadedCorrectly() {
    return Boolean(
      this.boardImage.complete && this.boardImage.naturalHeight !== 0,
    );
  }

  public onBoardConfigUpload(event: any) {
    const file = this.readFile(event);
    if (file.type.match(/text\/plain\/*/) == null) {
      return;
    }

    file.text().then((boardConfig: string) => {
      try {
        const boardModel = BoardModel.fromOther(JSON.parse(boardConfig));
        this.state.model = boardModel;
        this.localStorageService.saveData("boardModel", boardModel);
      } catch (error) {
        this.dialogService.openAlert(
          "Falha ao carregar configuração",
          "Por favor tente novamente",
        );
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  private readFile(event: any) {
    const files = event.target.files;
    if (event.target.files === 0) {
      return;
    }
    return files[0];
  }

  public onImageUpload(event: any) {
    const file = this.readFile(event);

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
      this.state.model.image.src =
        this.localStorageService.getImage("boardImage")?.src ?? "";
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
