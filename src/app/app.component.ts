import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Navigation } from "./utils/navigation";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public isSidenavOpen = false;
  public readonly Navigation = Navigation;

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly router: Router,
  ) {
    this.iconRegistry.addSvgIcon(
      "board_piece",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "assets/board_piece.svg",
      ),
    );
  }

  public get isToolbarVisible(): boolean {
    return this.router.url !== "/creator";
  }

  public onMenuClicked() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
