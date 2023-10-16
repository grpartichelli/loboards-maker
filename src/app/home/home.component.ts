import { Component, NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "lobogames-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  public readonly logoUrl = "assets/logo.png";

  public onAppClicked() {
    window.open(
      "https://play.google.com/store/apps/details?id=com.marcoantonioaav.lobogames",
    );
  }

  public onGameCreatorClicked() {}

  public onWebsiteClicked() {
    window.open("https://www.inf.ufrgs.br/lobogames/");
  }
}

@NgModule({
  declarations: [HomeComponent],
  imports: [MatCardModule, MatIconModule, NgOptimizedImage],
  exports: [HomeComponent],
})
export class HomeModule {}
