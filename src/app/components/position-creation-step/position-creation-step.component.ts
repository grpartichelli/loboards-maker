import {
  Component,
  NgModule,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
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
  public colors = PositionColorModel.allColorfulAndTransparent();
  private grabbedPosition: PositionModel | null = null;
  public isCursorGrabbing = false;
  public selectedPositionColors = PositionColorModel.allColorful();
  public sliderPercentage = BoardModel.DEFAULT_RADIUS_PERCENTAGE;
  private readonly PERCENTAGE_STEP_SIZE = 0.1;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.canvas = document.getElementById("image-canvas") as HTMLCanvasElement;
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.updateCardBorderStyle();
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
      if (this.model.positionColor === PositionColorModel.TRANSPARENT.hex) {
        const hexColor = position.selected
          ? this.model.selectedPositionColor
          : PositionColorHexTypeModel.BLACK;
        this.drawCircle(position, radius, false, hexColor);
        this.drawCircle(position, radius * 0.1, true, hexColor);
        return;
      }

      if (position.selected) {
        this.drawCircle(
          position,
          selectedRadius,
          true,
          this.model.selectedPositionColor,
        );
      } else {
        this.drawCircle(
          position,
          borderRadius,
          true,
          PositionColorHexTypeModel.BLACK,
        );
      }
      this.drawCircle(position, radius, true, this.model.positionColor);
    });
    this.changeDetectorRef.detectChanges();
  }

  public drawCircle(
    position: PositionModel,
    radius: number,
    isFilledCircled: boolean,
    hexColor: PositionColorHexTypeModel,
  ) {
    this.ctx.beginPath();
    this.ctx.arc(
      position.lengthPercentage.widthNormalized * this.canvas.width,
      position.lengthPercentage.heightNormalized * this.canvas.height,
      radius,
      0,
      2 * Math.PI,
    );

    if (isFilledCircled) {
      this.ctx.fillStyle = hexColor;
      this.ctx.fill();
    } else {
      this.ctx.strokeStyle = hexColor;
      this.ctx.lineWidth = 4;
      this.ctx.stroke();
    }
  }

  private ensurePercentageBounds(value: number): number {
    const percent = Math.max(0, Math.min(100, value));
    return Number.parseFloat(`${percent.toFixed(2)}`);
  }

  private findPosition(
    lengthPercentageModel: LengthPercentageModel,
  ): PositionModel | null {
    for (const position of this.model.positions) {
      const distance = Math.sqrt(
        (position.lengthPercentage.width - lengthPercentageModel.width) ** 2 +
          (position.lengthPercentage.height - lengthPercentageModel.height) **
            2,
      );
      const radius =
        (this.model.getBorderPositionRadius(this.canvas.width) /
          this.canvas.width) *
        100;

      if (distance < radius) {
        return position;
      }
    }
    return null;
  }

  public formatRadiusSlider(value: number): string {
    return `${Math.round(value * 100)}%`;
  }

  public onArrowUpClicked(position: PositionModel) {
    position.lengthPercentage.height = this.ensurePercentageBounds(
      position.lengthPercentage.height - this.PERCENTAGE_STEP_SIZE,
    );
    this.drawCanvas();
  }

  public onArrowLeftClicked(position: PositionModel) {
    position.lengthPercentage.width = this.ensurePercentageBounds(
      position.lengthPercentage.width - this.PERCENTAGE_STEP_SIZE,
    );
    this.drawCanvas();
  }

  public onArrowRightClicked(position: PositionModel) {
    position.lengthPercentage.width = this.ensurePercentageBounds(
      position.lengthPercentage.width + this.PERCENTAGE_STEP_SIZE,
    );
    this.drawCanvas();
  }

  public onArrowDownClicked(position: PositionModel) {
    position.lengthPercentage.height = this.ensurePercentageBounds(
      position.lengthPercentage.height + this.PERCENTAGE_STEP_SIZE,
    );
    this.drawCanvas();
  }

  public onCanvasMouseDown(mouseEvent: MouseEvent) {
    const lengthPercentage = this.resolveCursorLengthPercentage(mouseEvent);
    const position = this.findPosition(lengthPercentage);
    if (position == null) {
      this.model.addNewPosition(lengthPercentage);
      this.drawCanvas();
      return;
    }
    this.isCursorGrabbing = true;
    this.grabbedPosition = position;
  }

  public onCanvasMouseUp(mouseEvent: MouseEvent) {
    this.isCursorGrabbing = false;
    this.grabbedPosition = null;
  }

  public onCanvasMouseMove(mouseEvent: MouseEvent) {
    const lengthPercentage = this.resolveCursorLengthPercentage(mouseEvent);
    const position = this.isCursorGrabbing
      ? this.grabbedPosition
      : this.findPosition(lengthPercentage);

    this.model.positions.forEach((position) => (position.selected = false));

    if (position != null) {
      if (this.isCursorGrabbing) {
        position.lengthPercentage = lengthPercentage;
      }
      position.selected = true;
      this.scrollPositionIntoView(position);
    }
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

  public onHeightChanged(position: PositionModel, event: number) {
    if (this.isPercentageValid(event)) {
      position.lengthPercentage.height = event;
      this.drawCanvas();

      return;
    }

    // HACK: This is a hack to force the input to update
    position.lengthPercentage.height = -1;
    this.changeDetectorRef.detectChanges();
    // END HACK

    position.lengthPercentage.height = this.ensurePercentageBounds(event);
    this.drawCanvas();
  }

  private isPercentageValid(percentage: number) {
    if (percentage == null) {
      return false;
    }

    if (percentage < 0 || percentage > 100) {
      return false;
    }
    if (Math.floor(percentage) === percentage) {
      return true;
    }
    return (percentage.toString().split(".")[1].length || 0) <= 2;
  }

  public onWidthChanged(position: PositionModel, event: number) {
    if (this.isPercentageValid(event)) {
      position.lengthPercentage.width = event;
      this.drawCanvas();
      return;
    }

    // HACK: This is a hack to force the input to update
    position.lengthPercentage.width = 0;
    this.changeDetectorRef.detectChanges();
    // END HACK

    position.lengthPercentage.width = this.ensurePercentageBounds(event);
    this.drawCanvas();
  }

  public onPositionDeleteClicked(position: PositionModel) {
    this.model.deletePosition(position);
    this.drawCanvas();
  }

  public onPositionMouseEnter(position: PositionModel) {
    position.selected = true;
    this.drawCanvas();
  }

  public onPositionMouseLeave(position: PositionModel) {
    position.selected = false;
    this.drawCanvas();
  }

  public onSliderPercentageChange() {
    this.model.positionRadiusScale =
      this.sliderPercentage * BoardModel.MAX_RADIUS_SCALE;
    this.drawCanvas();
  }

  private resolveCursorLengthPercentage(
    mouseEvent: MouseEvent,
  ): LengthPercentageModel {
    const rect = this.canvas.getBoundingClientRect();
    const x = this.ensurePercentageBounds(
      ((mouseEvent.clientX - rect.left) / rect.width) * 100,
    );
    const y = this.ensurePercentageBounds(
      ((mouseEvent.clientY - rect.top) / rect.height) * 100,
    );
    return new LengthPercentageModel(x, y);
  }

  private scrollPositionIntoView(position: PositionModel) {
    const positionElement = document.getElementById(position.id);
    const containerElement = document.getElementById("card-container");

    if (!positionElement || !containerElement) {
      return;
    }

    const positionRect = positionElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();

    if (
      positionRect.bottom > containerRect.bottom ||
      positionRect.top < containerRect.top
    ) {
      positionElement.scrollIntoView();
    }
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
