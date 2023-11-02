export class CoordinateModel {
  public static fromOther(other: CoordinateModel): CoordinateModel {
    return new CoordinateModel(other.x, other.y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public x = 0;
  public y = 0;

  public equalsTo(other: CoordinateModel): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
