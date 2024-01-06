export enum GameModuleModel {
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
    public readonly type: GameModuleModel,
    public readonly name: string,
  ) {}

  public static ALIGNMENT_OR_BLOCK = new GameCategoryModel(
    GameModuleModel.ALIGNMENT_OR_BLOCK,
    "Alinhamento ou Bloqueio",
  );

  public static DISLOCATION = new GameCategoryModel(
    GameModuleModel.DISLOCATION,
    "Deslocamento",
  );

  public static POSITION = new GameCategoryModel(
    GameModuleModel.POSITION,
    "Posicionamento",
  );

  public static CAPTURE = new GameCategoryModel(
    GameModuleModel.CAPTURE,
    "Captura",
  );

  public static HUNT = new GameCategoryModel(GameModuleModel.HUNT, "Caça");
}
