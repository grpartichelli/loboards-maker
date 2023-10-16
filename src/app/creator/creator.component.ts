import { Component, NgModule, ViewEncapsulation } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgOptimizedImage } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "lobogames-creator",
  templateUrl: "./creator.component.html",
  styleUrls: ["./creator.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CreatorComponent {
  public readonly logoUrl = "assets/logo.png";
}

@NgModule({
  declarations: [CreatorComponent],
  imports: [MatProgressBarModule, MatButtonModule, NgOptimizedImage],
  exports: [CreatorComponent],
})
export class CreatorModule {}
