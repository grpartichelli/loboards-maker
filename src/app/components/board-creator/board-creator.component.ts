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
import { ImageUploadState } from "./states/image-upload.state";
import { BoardCreatorState } from "./states/board-creator.state";
import { NavigationService } from "../../commons/navigation.service";
import { ImageUploadStepModule } from "../image-upload-step/image-upload-step.component";
import { BoardModel } from "../../models/board.model";

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
  public progress = 0;
  public state!: BoardCreatorState;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly navigationService: NavigationService,
  ) {}

  public ngOnInit(): void {
    const initialState = new ImageUploadState(
      new BoardModel(),
      this.navigationService,
    );
    this.onStateChanged(initialState);
  }

  public get isAcceptEnabled(): boolean {
    return this.state.isAcceptEnabled();
  }

  public onAccept(): void {
    this.state.accept().then((newState) => {
      this.lastChangeStateCommand = ChangeStateCommand.ACCEPT;
      this.onStateChanged(newState);
    });
  }

  public onReject(): void {
    this.state.reject().then((newState) => {
      this.lastChangeStateCommand = ChangeStateCommand.REJECT;
      this.onStateChanged(newState);
    });
  }

  private onStateChanged(newState: BoardCreatorState): void {
    if (newState.isTerminal()) {
      this.navigationService.navigateToHome().then();
      return;
    }

    this.state = newState;
    this.progress = newState.progress();
    this.updateEnteringAnimations();
  }

  private updateEnteringAnimations() {
    this.enterAnimationClass =
      this.lastChangeStateCommand === ChangeStateCommand.ACCEPT
        ? "creator__state--enter-left"
        : "creator__state--enter-right";
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
    ImageUploadStepModule,
  ],
  exports: [BoardCreatorComponent],
})
export class CreatorModule {}
