import { Component, NgModule, Input, AfterViewInit } from "@angular/core";
import { NgOptimizedImage, NgIf, NgForOf, NgStyle } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { BoardModel } from "../../models/board.model";
import { LengthPercentageModel } from "../../models/length-percentage.model";
import { PositionModel } from "../../models/position.model";
import {
  PositionColorModel,
  PositionColorHexTypeModel,
} from "../../models/position-color-hex-type.model";
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import {
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDragHandle,
} from "@angular/cdk/drag-drop";

@Component({
  selector: "position-creation-step[model]",
  templateUrl: "./position-creation-step.component.html",
  styleUrls: ["./position-creation-step.component.scss"],
})
export class PositionCreationStepComponent implements AfterViewInit {
  @Input() model!: BoardModel;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  public cardBorderStyle = "";
  public colors = PositionColorModel.allColorful();
  public isCursorGrabbing = false;
  public percentage = 10.32;
  public sliderPercentage = BoardModel.DEFAULT_RADIUS_PERCENTAGE;
  PERCENTAGE_STEP_SIZE = 0.1;

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
        this.drawCircle(position, borderRadius, PositionColorModel.BLACK.hex);
      }
      this.drawCircle(position, radius, this.model.positionColor);
    });
  }

  public drawCircle(
    position: PositionModel,
    radius: number,
    hexTypeModel: PositionColorHexTypeModel,
  ) {
    this.ctx.beginPath();
    this.ctx.arc(
      position.lengthPercentage.width * this.canvas.width,
      position.lengthPercentage.height * this.canvas.height,
      radius,
      0,
      2 * Math.PI,
    );
    this.ctx.fillStyle = hexTypeModel;
    this.ctx.fill();
  }

  public formatRadiusSlider(value: number): string {
    return `${Math.round(value * 100)}%`;
  }

  public formatPositionPercentage(value: number): string {
    return `${(value * 100).toFixed(2)}%`;
  }

  public onArrowUpClicked(position: PositionModel) {
    const newY = position.lengthPercentage.height - this.PERCENTAGE_STEP_SIZE;
    position.lengthPercentage.height = Math.max(newY, 0);
    this.drawCanvas();
  }

  public onArrowLeftClicked(position: PositionModel) {
    const newX = position.lengthPercentage.width - this.PERCENTAGE_STEP_SIZE;
    position.lengthPercentage.width = Math.max(newX, 0);
    this.drawCanvas();
  }

  public onArrowRightClicked(position: PositionModel) {
    const newX = position.lengthPercentage.width + this.PERCENTAGE_STEP_SIZE;
    position.lengthPercentage.width = Math.min(newX, 1);
    this.drawCanvas();
  }

  public onArrowDownClicked(position: PositionModel) {
    const newY = position.lengthPercentage.height + this.PERCENTAGE_STEP_SIZE;
    position.lengthPercentage.height = Math.min(newY, 1);
    this.drawCanvas();
  }

  public onCanvasClick(mouseEvent: MouseEvent) {
    const coord = this.resolveCursorPosition(mouseEvent);
    this.model.addNewPosition(coord);
    this.drawCanvas();
  }

  public onCdkHandleClicked() {
    this.isCursorGrabbing = true;
  }

  public onCdkDropListDropped(event: CdkDragDrop<PositionModel[]>) {
    this.isCursorGrabbing = false;
    moveItemInArray(
      this.model.positions,
      event.previousIndex,
      event.currentIndex,
    );
  }

  public onColorChange() {
    this.updateCardBorderStyle();
    this.drawCanvas();
  }

  public onPositionDeleteClicked(position: PositionModel) {
    this.model.deletePosition(position);
    this.drawCanvas();
  }

  public onPositionMouseEnter(position: PositionModel) {
    this.updateCardBorderStyle();
    position.selected = true;
    this.drawCanvas();
  }

  public onPositionMouseLeave(position: PositionModel) {
    this.updateCardBorderStyle();
    position.selected = false;
    this.drawCanvas();
  }

  public onSliderPercentageChange() {
    this.model.positionRadiusScale =
      this.sliderPercentage * BoardModel.MAX_RADIUS_SCALE;
    this.updateCardBorderStyle();
    this.drawCanvas();
  }

  private resolveCursorPosition(mouseEvent: MouseEvent): LengthPercentageModel {
    const rect = this.canvas.getBoundingClientRect();
    const x = this.calculatePercentage(
      mouseEvent.clientX - rect.left,
      rect.width,
    );
    const y = this.calculatePercentage(
      mouseEvent.clientY - rect.top,
      rect.height,
    );
    return new LengthPercentageModel(x, y);
  }

  private calculatePercentage(numerator: number, denominator: number): number {
    return Math.max(0, Math.min(1, numerator / denominator));
  }

  private updateCardBorderStyle() {
    this.cardBorderStyle = `2px solid ${this.model.selectedPositionColor}`;
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
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    NgStyle,
    MatListModule,
    CdkDrag,
    CdkDropList,
    CdkDragPlaceholder,
    CdkDragHandle,
  ],
  exports: [PositionCreationStepComponent],
})
export class PositionCreationStepModule {}
