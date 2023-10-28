export class PositionModel {
  public static fromOther(other: PositionModel | null): PositionModel {
    const model = new PositionModel();
    if (other) {
      model.x = other.x;
      model.y = other.y;
      model.id = other.id;
      model.accessibilityOrder = other.accessibilityOrder;
    }
    return model;
  }

  public x = 0;
  public y = 0;
  public id = "";
  public accessibilityOrder = 0;

  public equalsTo(other: PositionModel): boolean {
    return this.id === other.id;
  }
}
