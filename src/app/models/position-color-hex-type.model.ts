export enum PositionColorHexTypeModel {
  WHITE = "#fefefe",
  BLACK = "#000000",
  RED = "#ff0000",
  GREEN = "#00ff00",
  DARK_BLUE = "#0000ff",
  LIGHT_BLUE = "#00ffff",
  YELLOW = "#ffff00",
  PINK = "#ff00ff",
}

export class PositionColorModel {
  public static allColorful(): PositionColorModel[] {
    return [
      PositionColorModel.YELLOW,
      PositionColorModel.LIGHT_BLUE,
      PositionColorModel.DARK_BLUE,
      PositionColorModel.PINK,
      PositionColorModel.GREEN,
      PositionColorModel.RED,
    ];
  }

  public static WHITE = new PositionColorModel(
    PositionColorHexTypeModel.WHITE,
    "Branco",
  );

  public static BLACK = new PositionColorModel(
    PositionColorHexTypeModel.BLACK,
    "Preto",
  );

  // do the same for all other colors
  public static RED = new PositionColorModel(
    PositionColorHexTypeModel.RED,
    "Vermelho",
  );
  public static GREEN = new PositionColorModel(
    PositionColorHexTypeModel.GREEN,
    "Verde",
  );

  public static DARK_BLUE = new PositionColorModel(
    PositionColorHexTypeModel.DARK_BLUE,
    "Azul Escuro",
  );

  public static LIGHT_BLUE = new PositionColorModel(
    PositionColorHexTypeModel.LIGHT_BLUE,
    "Azul Claro",
  );

  public static YELLOW = new PositionColorModel(
    PositionColorHexTypeModel.YELLOW,
    "Amarelo",
  );

  public static PINK = new PositionColorModel(
    PositionColorHexTypeModel.PINK,
    "Rosa",
  );

  public constructor(
    public hex: PositionColorHexTypeModel,
    public name: string,
  ) {}
}
