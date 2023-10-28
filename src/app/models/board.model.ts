import { PositionModel } from "./position.model";

export class BoardModel {
  public image: HTMLImageElement = new Image();
  public positionRadiusScale = 0;
  public positions = new Array<PositionModel>();

  public findPositionById(id: string): PositionModel | null {
    return this.positions.find((position) => position.id === id) ?? null;
  }
}
