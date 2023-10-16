import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public isSidenavOpen = true;
  public readonly logoUrl = "assets/logo.png";

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {
    this.iconRegistry.addSvgIcon(
      "board_piece",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "assets/board_piece.svg",
      ),
    );
  }

  public onAppClicked() {
    window.open(
      "https://play.google.com/store/apps/details?id=com.marcoantonioaav.lobogames",
    );
  }

  public onMenuClicked() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  public onGameCreatorClicked() {}

  public onWebsiteClicked() {
    window.open("https://www.inf.ufrgs.br/lobogames/");
  }
}
