import { Component, NgModule, Input, ChangeDetectorRef } from "@angular/core";
import { NgOptimizedImage, NgIf, NgForOf, NgStyle } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { BoardModel } from "../../models/board.model";
import { PositionModel } from "../../models/position.model";
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
  selector: "game-classification-step[model]",
  templateUrl: "./game-classification-step.component.html",
  styleUrls: ["./game-classification-step.component.scss"],
})
export class GameClassificationStepComponent {
  @Input() model!: BoardModel;
  public isCursorGrabbing = false;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

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
}

@NgModule({
  declarations: [GameClassificationStepComponent],
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
  exports: [GameClassificationStepComponent],
})
export class GameClassificationStepModule {}
