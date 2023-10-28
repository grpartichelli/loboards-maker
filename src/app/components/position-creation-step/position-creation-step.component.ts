import {
  Component,
  NgModule,
  ChangeDetectorRef,
  Input,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { NgOptimizedImage, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { BoardModel } from "../../models/board.model";

@Component({
  selector: "position-creation-step[model]",
  templateUrl: "./position-creation-step.component.html",
  styleUrls: ["./position-creation-step.component.scss"],
})
export class PositionCreationStepComponent implements AfterViewInit {
  @Input() model!: BoardModel;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.canvas = document.getElementById("image-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.initialize();
  }

  public initialize() {}
}

@NgModule({
  declarations: [PositionCreationStepComponent],
  imports: [
    NgOptimizedImage,
    NgIf,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatDialogModule,
  ],
  exports: [PositionCreationStepComponent],
})
export class PositionCreationStepModule {}
