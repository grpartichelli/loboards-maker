import { Component, NgModule } from "@angular/core";

@Component({
  selector: "lobogames-game-creator",
  templateUrl: "./game-creator.component.html",
  styleUrls: ["./game-creator.component.scss"],
})
export class GameCreatorComponent {
  public readonly logoUrl = "assets/logo.png";
}

@NgModule({
  declarations: [GameCreatorComponent],
  imports: [],
  exports: [GameCreatorComponent],
})
export class GameCreatorModule {}
