import { CoordinateModel } from "./coordinate.model";

export class PositionModel {
  public selected = false;

  public static fromOther(other: PositionModel): PositionModel {
    return new PositionModel(other.id, CoordinateModel.fromOther(other.coord));
  }

  public constructor(
    public id: string,
    public coord: CoordinateModel,
  ) {
    this.id = id;
    this.coord = coord;
  }

  public equalsTo(other: PositionModel): boolean {
    return this.id === other.id;
  }
}
