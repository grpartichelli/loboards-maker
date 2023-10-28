export class PositionModel {
  public x = 0;
  public y = 0;
  public id = "";
  public accessibilityOrder = 0;

  public equalsTo(other: PositionModel): boolean {
    return this.id === other.id;
  }
}
