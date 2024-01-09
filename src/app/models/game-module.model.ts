export enum GameModuleTypeModel {
  ALIGNMENT_OR_BLOCK = "ALIGNMENT_OR_BLOCK",
  DISLOCATION = "DISLOCATION",
  POSITION = "POSITION",
  CAPTURE = "CAPTURE",
  HUNT = "HUNT",
}

export class GameModuleModel {
  public static all(): Array<GameModuleModel> {
    return [
      GameModuleModel.ALIGNMENT_OR_BLOCK,
      GameModuleModel.DISLOCATION,
      GameModuleModel.POSITION,
      GameModuleModel.CAPTURE,
      GameModuleModel.HUNT,
    ];
  }

  public constructor(
    public readonly type: GameModuleTypeModel,
    public readonly name: string,
  ) {}

  public static ALIGNMENT_OR_BLOCK = new GameModuleModel(
    GameModuleTypeModel.ALIGNMENT_OR_BLOCK,
    "Alinhamento ou Bloqueio",
  );

  public static DISLOCATION = new GameModuleModel(
    GameModuleTypeModel.DISLOCATION,
    "Deslocamento",
  );

  public static POSITION = new GameModuleModel(
    GameModuleTypeModel.POSITION,
    "Posicionamento",
  );

  public static CAPTURE = new GameModuleModel(
    GameModuleTypeModel.CAPTURE,
    "Captura",
  );

  public static HUNT = new GameModuleModel(GameModuleTypeModel.HUNT, "Caça");
}
