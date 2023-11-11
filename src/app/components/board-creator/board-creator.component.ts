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

import { NavigationService } from "../../commons/navigation.service";
import { BoardSelectStepModule } from "../board-select-step/board-select-step.component";
import { LocalStorageService } from "../../commons/local-storage.service";
import { PositionCreationStepModule } from "../position-creation-step/position-creation-step.component";
import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./states/board-creator.state";
import { BoardModel } from "../../models/board.model";
import { PositionCreationState } from "./states/position-creation.state";
import { BoardSelectState } from "./states/board-select.state";
import { SuccessStepModule } from "../success-step/success-step.component";
import { SuccessState } from "./states/success.state";
import { BoardConfig } from "../../models/board.config";
import { FileService } from "../../commons/file.service";

const enum ChangeStateCommand {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "lobogames-board-creator",
  templateUrl: "./board-creator.component.html",
  styleUrls: ["./board-creator.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BoardCreatorComponent implements OnInit {
  public enterAnimationClass = "";
  private lastChangeStateCommand = ChangeStateCommand.ACCEPT;
  public acceptMessage = "";
  public progress = 0;
  public state!: BoardCreatorState;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly fileService: FileService,
    private readonly localStorageService: LocalStorageService,
    private readonly navigationService: NavigationService,
  ) {}

  public ngOnInit(): void {
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
          new BoardSelectState(
            state.model,
            this.fileService,
            this.localStorageService,
            this.navigationService,
          ),
        );
      }
    };
  }

  public onAccept(): void {
    this.state.accept().then((newState) => {
      this.lastChangeStateCommand = ChangeStateCommand.ACCEPT;
      this.onStateChanged(newState);
    });
  }

  public get isAcceptEnabled(): boolean {
    return this.state.isAcceptEnabled();
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
    this.acceptMessage = newState.acceptMessage();
    this.progress = newState.progress();
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
      default:
        return new BoardSelectState(
          model,
          this.fileService,
          this.localStorageService,
          this.navigationService,
        );
    }
  }

  private updateEnteringAnimations() {
    this.enterAnimationClass =
      this.lastChangeStateCommand === ChangeStateCommand.ACCEPT
        ? "board-creator__state--enter-left"
        : "board-creator__state--enter-right";
    this.changeDetectorRef.detectChanges();

    setTimeout(() => {
      this.enterAnimationClass = "";
      this.changeDetectorRef.detectChanges();
    }, 500);
  }
}

@NgModule({
  declarations: [BoardCreatorComponent],
  imports: [
    MatProgressBarModule,
    MatButtonModule,
    NgOptimizedImage,
    NgIf,
    BoardSelectStepModule,
    PositionCreationStepModule,
    SuccessStepModule,
  ],
  exports: [BoardCreatorComponent],
})
export class CreatorModule {}
