import { Component, NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { NavigationService } from "../../services/navigation.service";
import { RouterLink } from "@angular/router";
import { FileService } from "../../services/file.service";

@Component({
  selector: "loboards-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  public readonly logoHeight = 390 * 0.55;
  public readonly logoWidth = 1155 * 0.55;
  constructor(
    private readonly navigationService: NavigationService,
    private readonly fileService: FileService,
  ) {}

  public onAppClicked() {
    this.fileService.downloadApk();
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
