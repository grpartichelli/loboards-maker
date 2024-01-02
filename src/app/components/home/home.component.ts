import { Component, NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { NavigationService } from "../../commons/navigation.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "loboards-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(private readonly navigationService: NavigationService) {}

  public onAppClicked() {
    this.navigationService.navigateToApp();
  }

  public onWebsiteClicked() {
    this.navigationService.navigateToWebsite();
  }
}

@NgModule({
  declarations: [HomeComponent],
  imports: [MatCardModule, MatIconModule, NgOptimizedImage, RouterLink],
  exports: [HomeComponent],
})
export class HomeModule {}
