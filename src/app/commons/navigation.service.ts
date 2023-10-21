import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class NavigationService {
  constructor(private readonly router: Router) {}

  public isOnCreatorRoute() {
    return this.router.url !== "/creator";
  }

  public navigateToApp() {
    window.open(
      "https://play.google.com/store/apps/details?id=com.marcoantonioaav.lobogames",
    );
  }

  public navigateToHome(): Promise<void> {
    return this.router.navigate(["/"]).then();
  }

  public navigateToWebsite() {
    window.open("https://www.inf.ufrgs.br/lobogames/");
  }
}
