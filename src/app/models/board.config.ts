import { PositionModel } from "./position.model";
import { BoardModel } from "./board.model";
import { GameModel } from "./game.model";

export class BoardConfig {
  public static fromBoardModel(model: BoardModel): BoardConfig {
    const config = new BoardConfig();
    config.games = model.games.map((it) => GameModel.fromOther(it));
    config.name = model.name;
    config.positionColor = model.positionColor;
    config.positionRadiusScale = model.positionRadiusScale;
    config.positions = model.positions.map((it) => {
      const other = PositionModel.fromOther(it);
      other.lengthPercentage.height = other.lengthPercentage.heightNormalized;
      other.lengthPercentage.width = other.lengthPercentage.widthNormalized;
      return other;
    });
    config.selectedPositionColor = model.selectedPositionColor;
    config.imageUrl = model.image.src;
    return config;
  }

  public games: Array<GameModel> | null = null;
  public imageUrl: string | null = null;
  name: string | null = null;
  positionColor: string | null = null;
  positionRadiusScale: number | null = null;
  positions: Array<PositionModel> | null = null;
  selectedPositionColor: string | null = null;
}
