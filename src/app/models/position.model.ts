import { CoordinateModel } from "./coordinate.model";

export class PositionModel {
  public static fromOther(other: PositionModel): PositionModel {
    return new PositionModel(
      other.id,
      CoordinateModel.fromOther(other.coord),
      other.accessibilityOrder,
    );
  }

  public constructor(
    public id: string,
    public coord: CoordinateModel,
    public accessibilityOrder: number,
  ) {
    this.id = id;
    this.coord = coord;
    this.accessibilityOrder = accessibilityOrder;
  }

  public equalsTo(other: PositionModel): boolean {
    return this.id === other.id;
  }
}
