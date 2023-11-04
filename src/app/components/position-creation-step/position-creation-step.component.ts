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
  public colors = PositionColorModel.allColorful();
  public isCursorGrabbing = false;
  public sliderPercentage = BoardModel.DEFAULT_RADIUS_PERCENTAGE;
  private readonly PERCENTAGE_STEP_SIZE = 0.1;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

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
      position.lengthPercentage.widthNormalized * this.canvas.width,
      position.lengthPercentage.heightNormalized * this.canvas.height,
      radius,
      0,
      2 * Math.PI,
    );
    this.ctx.fillStyle = hexTypeModel;
    this.ctx.fill();
  }

  private ensurePercentageBounds(value: number): number {
    const percent = Math.max(0, Math.min(100, value));
    return Number.parseFloat(`${percent.toFixed(2)}`);
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
    console.log("before");
    console.log(position.lengthPercentage.height);
    console.log(this.PERCENTAGE_STEP_SIZE);
    position.lengthPercentage.height = this.ensurePercentageBounds(
      position.lengthPercentage.height + this.PERCENTAGE_STEP_SIZE,
    );
    console.log("after");
    console.log(position.lengthPercentage.height);
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

  public onPositionLengthPercentageChanged(
    position: PositionModel,
    event: number,
  ) {
    if (this.isPercentageValid(event)) {
      position.lengthPercentage.height = event;
      return;
    }

    // HACK: This is a hack to force the input to update
    position.lengthPercentage.height = -1;
    this.changeDetectorRef.detectChanges();
    // END HACK

    position.lengthPercentage.height = this.ensurePercentageBounds(event);
    console.log("updated to: " + position.lengthPercentage.height);
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
    const x = this.ensurePercentageBounds(
      ((mouseEvent.clientX - rect.left) / rect.width) * 100,
    );
    const y = this.ensurePercentageBounds(
      ((mouseEvent.clientY - rect.top) / rect.height) * 100,
    );
    return new LengthPercentageModel(x, y);
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
