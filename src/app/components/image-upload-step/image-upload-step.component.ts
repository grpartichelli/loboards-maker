import { Component, NgModule } from "@angular/core";

@Component({
  selector: "image-upload-step",
  templateUrl: "./image-upload-step.component.html",
  styleUrls: ["./image-upload-step.component.scss"],
})
export class ImageUploadStepComponent {
  constructor() {}
}

@NgModule({
  declarations: [ImageUploadStepComponent],
  imports: [],
  exports: [ImageUploadStepComponent],
})
export class ImageUploadStepModule {}
