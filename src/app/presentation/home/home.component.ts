import { Component, NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { Navigation } from "../../utils/navigation";
import { RouterLink } from "@angular/router";

@Component({
  selector: "lobogames-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  public readonly logoUrl = "assets/logo.png";
  public readonly Navigation = Navigation;
}

@NgModule({
  declarations: [HomeComponent],
  imports: [MatCardModule, MatIconModule, NgOptimizedImage, RouterLink],
  exports: [HomeComponent],
})
export class HomeModule {}
