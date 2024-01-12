import {
  Component,
  NgModule,
  ViewEncapsulation,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgOptimizedImage, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

import { NavigationService } from "../../services/navigation.service";
import { BoardDesignStepModule } from "./board-design-step/board-design-step.component";
import { LocalStorageService } from "../../services/local-storage.service";
import { PositionCreationStepModule } from "./position-creation-step/position-creation-step.component";
import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./states/board-creator.state";
import { BoardModel } from "../../models/board.model";
import { PositionCreationState } from "./states/position-creation.state";
import { BoardDesignState } from "./states/board-design.state";
import { SuccessStepModule } from "./success-step/success-step.component";
import { SuccessState } from "./states/success.state";
import { BoardConfig } from "../../models/board.config";
import { FileService } from "../../services/file.service";
import { DialogService } from "../../services/dialog.service";
import { MobileDetectionService } from "../../services/mobile-detection.service";
import { GameClassificationStepModule } from "./game-classification-step/game-classification-step.component";
import { GameClassificationState } from "./states/game-classification.state";

const enum ChangeStateCommand {
  CONFIRM = "CONFIRM",
  REJECT = "REJECT",
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "board-creator-steps",
  templateUrl: "./board-creator-steps.component.html",
  styleUrls: ["./board-creator-steps.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BoardCreatorStepsComponent implements OnInit {
  public enterAnimationClass = "";
  private lastChangeStateCommand = ChangeStateCommand.CONFIRM;
  public confirmMessage = "";
  public progressPercentage = 0;
  public state!: BoardCreatorState;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialogService: DialogService,
    private readonly fileService: FileService,
    private readonly mobileDetectionService: MobileDetectionService,
    private readonly localStorageService: LocalStorageService,
    private readonly navigationService: NavigationService,
  ) {}

  public ngOnInit(): void {
    if (this.mobileDetectionService.isMobile()) {
      this.dialogService
        .openConfirmation(
          "Aplicação não está otimizada para celulares",
          "Recomendamos fortemente que utilize um computador para ter a melhor experiência.",
        )
        .then((result) => {
          if (!result) {
            this.navigationService.navigateToHome().then();
          }
        });
    }

    const state = this.resolveInitialState();

    if (!state.model.imageExists) {
      this.onStateChanged(state);
      return;
    }

    state.model.image.onload = () => {
      if (state.model.isImageLoadedCorrectly) {
        this.onStateChanged(state);
      } else {
        this.onStateChanged(
          new BoardDesignState(
            state.model,
            this.fileService,
            this.localStorageService,
            this.navigationService,
          ),
        );
      }
    };
  }

  public onConfirm(): void {
    this.state.confirm().then((newState) => {
      this.lastChangeStateCommand = ChangeStateCommand.CONFIRM;
      this.onStateChanged(newState);
    });
  }

  public get isConfirmEnabled(): boolean {
    return this.state.isConfirmEnabled();
  }

  public onReject(): void {
    this.state.reject().then((newState) => {
      this.lastChangeStateCommand = ChangeStateCommand.REJECT;
      this.onStateChanged(newState);
    });
  }

  private onStateChanged(newState: BoardCreatorState): void {
    if (newState.isTerminalState) {
      this.navigationService.navigateToHome().then();
      return;
    }

    this.state = newState;
    this.confirmMessage = newState.confirmMessage();
    this.progressPercentage = newState.progressPercentage();
    this.updateEnteringAnimations();
  }

  public resolveInitialState() {
    const model = BoardModel.fromBoardConfig(
      this.localStorageService.getData<BoardConfig>("boardConfig"),
    );

    const stateType =
      this.localStorageService.getData<BoardCreatorStateType>("state");

    switch (stateType) {
      case BoardCreatorStateType.POSITION_CREATION:
        return new PositionCreationState(
          model,
          this.fileService,
          this.localStorageService,
          this.navigationService,
        );
      case BoardCreatorStateType.SUCCESS:
        return new SuccessState(
          model,
          this.fileService,
          this.localStorageService,
          this.navigationService,
        );
      case BoardCreatorStateType.GAME_CLASSIFICATION:
        return new GameClassificationState(
          model,
          this.fileService,
          this.localStorageService,
          this.navigationService,
        );
      default:
        return new BoardDesignState(
          model,
          this.fileService,
          this.localStorageService,
          this.navigationService,
        );
    }
  }

  private updateEnteringAnimations() {
    this.enterAnimationClass =
      this.lastChangeStateCommand === ChangeStateCommand.CONFIRM
        ? "board-creator-steps__state--enter-left"
        : "board-creator-steps__state--enter-right";
    this.changeDetectorRef.detectChanges();

    setTimeout(() => {
      this.enterAnimationClass = "";
      this.changeDetectorRef.detectChanges();
    }, 500);
  }
}

@NgModule({
  declarations: [BoardCreatorStepsComponent],
  imports: [
    MatProgressBarModule,
    MatButtonModule,
    NgOptimizedImage,
    NgIf,
    BoardDesignStepModule,
    PositionCreationStepModule,
    SuccessStepModule,
    GameClassificationStepModule,
  ],
  exports: [BoardCreatorStepsComponent],
})
export class CreatorModule {}
