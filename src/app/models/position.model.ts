import { LengthPercentageModel } from "./length-percentage.model";

export class PositionModel {
  public selected = false;

  public static fromOther(other: PositionModel): PositionModel {
    return new PositionModel(
      other.id,
      LengthPercentageModel.fromOther(other.lengthPercentage),
    );
  }

  public constructor(
    public id: string,
    public lengthPercentage: LengthPercentageModel,
  ) {
    this.id = id;
    this.lengthPercentage = lengthPercentage;
  }

  public equalsTo(other: PositionModel): boolean {
    return this.id === other.id;
  }
}
