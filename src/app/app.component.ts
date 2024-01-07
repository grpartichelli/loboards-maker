import { Component, OnInit } from "@angular/core";
import { NavigationService } from "./commons/navigation.service";
import { IconRegistry } from "./commons/icon.registry";
import { Router } from "@angular/router";
import { FileService } from "./commons/file.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public isSidenavOpen = false;

  constructor(
    private readonly iconRegistry: IconRegistry,
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
