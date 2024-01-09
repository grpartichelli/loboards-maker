import { Component, NgModule, Input } from "@angular/core";
import { NgOptimizedImage, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { BoardModel } from "../../../models/board.model";
import { NavigationService } from "../../../services/navigation.service";

@Component({
  selector: "success-step[model]",
  templateUrl: "./success-step.component.html",
  styleUrls: ["./success-step.component.scss"],
})
export class SuccessStepComponent {
  @Input() model!: BoardModel;

  constructor(private readonly navigationService: NavigationService) {}
}

@NgModule({
  declarations: [SuccessStepComponent],
  imports: [
    NgOptimizedImage,
    NgIf,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatDialogModule,
  ],
  exports: [SuccessStepComponent],
})
export class SuccessStepModule {}
