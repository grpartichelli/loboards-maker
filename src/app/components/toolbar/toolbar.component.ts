import { Component, NgModule, Output, EventEmitter } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "lobogames-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  @Output() onMenuActionRequested = new EventEmitter<void>();

  public onMenuClicked() {
    this.onMenuActionRequested.emit();
  }
}

@NgModule({
  declarations: [ToolbarComponent],
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
