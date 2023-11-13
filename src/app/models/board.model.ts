import { PositionModel } from "./position.model";
import { LengthPercentageModel } from "./length-percentage.model";
import { PositionColorHexTypeModel } from "./position-color-hex-type.model";
import { BoardConfig } from "./board.config";

export class BoardModel {
  public static fromBoardConfig(config: BoardConfig | null): BoardModel {
    const model = new BoardModel();

    if (!config) {
      return model;
    }

    if (config.name) {
      model.name = config.name;
    }

    if (config.positionColor) {
      model.positionColor = config.positionColor as PositionColorHexTypeModel;
    }

    if (config.positionRadiusScale) {
      model.positionRadiusScale = config.positionRadiusScale;
    }

    if (config.selectedPositionColor) {
      model.selectedPositionColor =
        config.selectedPositionColor as PositionColorHexTypeModel;
    }

    if (config.positions) {
      model.positions = config.positions.map((position) => {
        const other = PositionModel.fromOther(position);
        other.lengthPercentage.height *= 100;
        position.lengthPercentage.width *= 100;
        return PositionModel.fromOther(position);
      });
    }

    if (config.imageUrl) {
      model.image.src = config.imageUrl;
    }

    return model;
  }

  public static MAX_RADIUS_SCALE = 0.2;
  public static DEFAULT_RADIUS_PERCENTAGE = 0.3;

  public image: HTMLImageElement = new Image();
  public name = "";
  public positionRadiusScale =
    BoardModel.MAX_RADIUS_SCALE * BoardModel.DEFAULT_RADIUS_PERCENTAGE;
  public positionColor = PositionColorHexTypeModel.PINK;
  public positions = new Array<PositionModel>();
  public selectedPositionColor = PositionColorHexTypeModel.LIGHT_BLUE;

  public addNewPosition(coordinate: LengthPercentageModel): void {
    this.positions.push(new PositionModel(this.calculateId(), coordinate));
  }

  private calculateId(): string {
    const ids = this.positions.map((position) => position.id);
    let number = 0;
    let char = "a";
    let id = char;

    while (ids.includes(id)) {
      if (char === "z") {
        char = String.fromCharCode("a".charCodeAt(0) - 1);
        number++;
      }

      char = String.fromCharCode(char.charCodeAt(0) + 1);
      if (number === 0) {
        id = char;
      } else {
        id = number + char;
      }
    }
    return id;
  }

  public deletePosition(position: PositionModel): void {
    this.positions = this.positions.filter((it) => !it.equalsTo(position));
  }

  public get imageExists(): boolean {
    return Boolean(this.image.src);
  }

  public get isImageLoadedCorrectly(): boolean {
    return this.image.complete && this.image.naturalHeight !== 0;
  }

  public getBorderRadius(width: number): number {
    return this.positionRadiusScale * width;
  }

  public getBorderPositionRadius(width: number): number {
    return this.getBorderRadius(width) * 1.09;
  }

  public getSelectedPositionRadius(width: number): number {
    return this.getBorderPositionRadius(width) * 1.11;
  }
}
