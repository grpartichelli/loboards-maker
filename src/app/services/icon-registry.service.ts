import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({ providedIn: "root" })
export class IconRegistryService {
  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {}

  public registerAll() {
    this.iconRegistry.addSvgIcon(
      "board",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/board.svg"),
    );
  }
}
