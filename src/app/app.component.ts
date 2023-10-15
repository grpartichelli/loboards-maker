import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
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
  public readonly logoUrl = "assets/logo.png";

  public onGameCreatorClick() {}

  public onAppClick() {
    window.open(
      "https://play.google.com/store/apps/details?id=com.marcoantonioaav.lobogames",
    );
  }

  public onProjectClick() {
    window.open("https://www.inf.ufrgs.br/lobogames/");
  }
}
