import { Component, NgModule, ViewEncapsulation, OnInit } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgOptimizedImage } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { ImageUploadState } from "./states/image-upload.state";
import { CreatorState } from "./states/creator.state";
import { NavigationService } from "../../commons/navigation.service";

@Component({
  selector: "lobogames-creator",
  templateUrl: "./creator.component.html",
  styleUrls: ["./creator.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CreatorComponent implements OnInit {
  public state!: CreatorState;

  constructor(private readonly navigationService: NavigationService) {}

  public ngOnInit(): void {
    const initialState = new ImageUploadState(this.navigationService);
    this.onStateChanged(initialState);
  }

  public onAccept() {
    this.state.accept().then((newState) => this.onStateChanged(newState));
  }

  public onReject() {
    this.state.reject().then((newState) => this.onStateChanged(newState));
  }

  private onStateChanged(newState: CreatorState) {
    if (newState.isTerminal()) {
      this.navigationService.navigateToHome().then();
      return;
    }
    this.state = newState;
  }
}

@NgModule({
  declarations: [CreatorComponent],
  imports: [MatProgressBarModule, MatButtonModule, NgOptimizedImage],
  exports: [CreatorComponent],
})
export class CreatorModule {}
