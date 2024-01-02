import { GameCategoryTypeModel } from "./game-category.model";

export class GameModel {
  public static fromOther(other: GameModel): GameModel {
    return new GameModel(
      other.category,
      other.name,
      other.videoUrl,
      other.textUrl,
    );
  }

  public constructor(
    public category: GameCategoryTypeModel,
    public name: string,
    public videoUrl: string,
    public textUrl: string,
  ) {}
}
