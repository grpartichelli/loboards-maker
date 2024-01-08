import { Component, OnInit } from "@angular/core";
import { NavigationService } from "./services/navigation.service";
import { IconRegistryService } from "./services/icon-registry.service";
import { Router } from "@angular/router";
import { FileService } from "./services/file.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public isSidenavOpen = false;

  constructor(
    private readonly iconRegistry: IconRegistryService,
    private readonly fileService: FileService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
  ) {
    this.iconRegistry.registerAll();
  }

  public ngOnInit(): void {
    this.router.events.subscribe(() => (this.isSidenavOpen = false));
  }

  public get isToolbarVisible(): boolean {
    return this.navigationService.isOnCreatorRoute();
  }

  public onAppClicked() {
    this.fileService.downloadApk();
  }

  public onMenuClicked() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  public onWebsiteClicked() {
    this.navigationService.navigateToWebsite();
  }
}
