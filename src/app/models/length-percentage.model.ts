export class LengthPercentageModel {
  public static fromOther(other: LengthPercentageModel): LengthPercentageModel {
    return new LengthPercentageModel(other.width, other.height);
  }

  constructor(
    public width: number,
    public height: number,
  ) {}

  public equalsTo(other: LengthPercentageModel): boolean {
    return this.width === other.width && this.height === other.height;
  }

  public get widthNormalized(): number {
    return this.width / 100;
  }

  public get heightNormalized(): number {
    return this.height / 100;
  }
}
