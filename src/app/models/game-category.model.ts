export enum GameCategoryTypeModel {
  ALIGNMENT_OR_BLOCK = "ALIGNMENT_OR_BLOCK",
  DISLOCATION = "DISLOCATION",
  POSITION = "POSITION",
  CAPTURE = "CAPTURE",
  HUNT = "HUNT",
}

export class GameCategoryModel {
  public static all(): Array<GameCategoryModel> {
    return [
      GameCategoryModel.ALIGNMENT_OR_BLOCK,
      GameCategoryModel.DISLOCATION,
      GameCategoryModel.POSITION,
      GameCategoryModel.CAPTURE,
      GameCategoryModel.HUNT,
    ];
  }

  public constructor(
    public readonly type: GameCategoryTypeModel,
    public readonly name: string,
  ) {}

  public static ALIGNMENT_OR_BLOCK = new GameCategoryModel(
    GameCategoryTypeModel.ALIGNMENT_OR_BLOCK,
    "Alinhamento ou Bloqueio",
  );

  public static DISLOCATION = new GameCategoryModel(
    GameCategoryTypeModel.DISLOCATION,
    "Deslocamento",
  );

  public static POSITION = new GameCategoryModel(
    GameCategoryTypeModel.POSITION,
    "Posicionamento",
  );

  public static CAPTURE = new GameCategoryModel(
    GameCategoryTypeModel.CAPTURE,
    "Captura",
  );

  public static HUNT = new GameCategoryModel(
    GameCategoryTypeModel.HUNT,
    "Caça",
  );
}
