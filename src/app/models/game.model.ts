import { GameCategoryTypeModel } from "./game-category.model";

export class GameModel {
  public static fromOther(other: GameModel): GameModel {
    return new GameModel(other.name, other.category);
  }

  public constructor(
    public name: string,
    public category: GameCategoryTypeModel,
  ) {}
}
