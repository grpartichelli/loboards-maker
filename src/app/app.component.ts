import { Component } from "@angular/core";
import { NavigationService } from "./commons/navigation.service";
import { IconsRegistry } from "./commons/icons.registry";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public isSidenavOpen = false;

  constructor(
    private readonly iconsRegistry: IconsRegistry,
    private readonly navigationService: NavigationService,
  ) {
    this.iconsRegistry.registerAll();
  }

  public get isToolbarVisible(): boolean {
    return this.navigationService.isOnCreatorRoute();
  }

  public onAppClicked() {
    this.navigationService.navigateToApp();
  }

  public onMenuClicked() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  public onWebsiteClicked() {
    this.navigationService.navigateToWebsite();
  }
}
