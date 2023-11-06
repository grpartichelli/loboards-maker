import {
  Component,
  NgModule,
  ChangeDetectorRef,
  Input,
  OnInit,
} from "@angular/core";
import { NgOptimizedImage, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { BoardModel } from "../../models/board.model";
import { LocalStorageService } from "../../commons/local-storage.service";

@Component({
  selector: "success-step[model]",
  templateUrl: "./success-step.component.html",
  styleUrls: ["./success-step.component.scss"],
})
export class SuccessStepComponent implements OnInit {
  @Input() model!: BoardModel;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {}
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
