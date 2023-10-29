import { Component, NgModule, Input, AfterViewInit } from "@angular/core";
import { NgOptimizedImage, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { BoardModel } from "../../models/board.model";
import { CoordinateModel } from "../../models/coordinate.model";
import { PositionModel } from "../../models/position.model";
import { PositionColorTypeModel } from "../../models/position-color-type.model";
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "position-creation-step[model]",
  templateUrl: "./position-creation-step.component.html",
  styleUrls: ["./position-creation-step.component.scss"],
})
export class PositionCreationStepComponent implements AfterViewInit {
  @Input() model!: BoardModel;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  public sliderPercentage = 0.25;

  public ngAfterViewInit(): void {
    this.canvas = document.getElementById("image-canvas") as HTMLCanvasElement;
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.drawCanvas();
  }

  private drawCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.model.image,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );

    const radius = this.model.getBorderRadius(this.canvas.width);
    const borderRadius = this.model.getBorderPositionRadius(this.canvas.width);
    const selectedRadius = this.model.getSelectedPositionRadius(
      this.canvas.width,
    );
    this.model.positions.forEach((position) => {
      if (position.selected) {
        this.drawCircle(
          position,
          selectedRadius,
          this.model.selectedPositionColor,
        );
      } else {
        this.drawCircle(position, borderRadius, PositionColorTypeModel.BLACK);
      }
      this.drawCircle(position, radius, this.model.positionColor);
    });
  }

  public drawCircle(
    position: PositionModel,
    radius: number,
    color: PositionColorTypeModel,
  ) {
    this.ctx.beginPath();
    this.ctx.arc(position.coord.x, position.coord.y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  public formatSliderLabel(value: number): string {
    return `${Math.round(value * 100)}%`;
  }

  public onCanvasClick(mouseEvent: MouseEvent) {
    const coord = this.resolveCursorPosition(mouseEvent);
    this.model.addNewPosition(coord);
    this.drawCanvas();
  }

  public onRadiusScaleSliderChange() {
    this.model.positionRadiusScale =
      this.sliderPercentage * BoardModel.MAX_RADIUS_SCALE;
    this.drawCanvas();
  }

  private resolveCursorPosition(mouseEvent: MouseEvent): CoordinateModel {
    const rect = this.canvas.getBoundingClientRect();
    const x = mouseEvent.clientX - rect.left;
    const y = mouseEvent.clientY - rect.top;
    return new CoordinateModel(x, y);
  }
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
    MatSliderModule,
    FormsModule,
  ],
  exports: [PositionCreationStepComponent],
})
export class PositionCreationStepModule {}
