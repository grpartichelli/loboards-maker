import { PositionModel } from "./position.model";
import { CoordinateModel } from "./coordinate.model";

export class BoardModel {
  public static fromOther(other: BoardModel | null): BoardModel {
    const model = new BoardModel();
    if (other) {
      model.positionRadiusScale = other.positionRadiusScale;
      // model.positions = other.positions.map((position) =>
      //   PositionModel.fromOther(position),
      // );
    }
    return model;
  }

  public image: HTMLImageElement = new Image();
  public positionRadiusScale = 1 / 18;
  public positions = new Array<PositionModel>();

  public addNewPosition(coordinate: CoordinateModel): void {
    this.positions.push(new PositionModel("", coordinate, 0));
  }

  public findPositionById(id: string): PositionModel | null {
    return this.positions.find((position) => position.id === id) ?? null;
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
    return this.getBorderRadius(width) * 1.08;
  }

  public getSelectedPositionRadius(width: number): number {
    return this.getBorderPositionRadius(width) * 1.11;
  }
}
