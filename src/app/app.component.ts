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
    private readonly navigationUtils: NavigationService,
  ) {
    this.iconsRegistry.registerAll();
  }

  public get isToolbarVisible(): boolean {
    return this.navigationUtils.isOnCreatorRoute();
  }

  public onAppClicked() {
    this.navigationUtils.navigateToApp();
  }

  public onMenuClicked() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  public onWebsiteClicked() {
    this.navigationUtils.navigateToWebsite();
  }
}
