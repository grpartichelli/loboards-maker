import { NavigationService } from "../../../services/navigation.service";
import { BoardDesignState } from "./board-design.state";
import { TerminalState } from "./terminal.state";
import { BoardModel } from "../../../models/board.model";
import { LocalStorageService } from "../../../services/local-storage.service";
import { PositionCreationState } from "./position-creation.state";
import { SuccessState } from "./success.state";
import { BoardConfig } from "../../../models/board.config";
import { FileService } from "../../../services/file.service";
import { GameClassificationState } from "./game-classification.state";

export abstract class BoardCreatorState {
  constructor(
    public model: BoardModel,
    protected readonly fileService: FileService,
    protected readonly localStorageService: LocalStorageService,
    protected readonly navigationService: NavigationService,
  ) {}

  public abstract confirm(): Promise<BoardCreatorState>;
  public abstract confirmMessage(): string;
  public abstract reject(): Promise<BoardCreatorState>;
  public abstract isConfirmEnabled(): boolean;
  public abstract type(): BoardCreatorStateType;
  public abstract progressPercentage(): number;

  public moveTo(
    state: CreatorStateImplementations,
  ): Promise<BoardCreatorState> {
    const nextState = new state(
      this.model,
      this.fileService,
      this.localStorageService,
      this.navigationService,
    );
    this.localStorageService.saveData(
      "boardConfig",
      BoardConfig.fromBoardModel(this.model),
    );
    this.localStorageService.saveData("state", nextState.type());
    return Promise.resolve(nextState);
  }

  public stayOnCurrentState(): Promise<BoardCreatorState> {
    return Promise.resolve(this);
  }

  public get isBoardDesignState(): boolean {
    return this.type() === BoardCreatorStateType.BOARD_DESIGN;
  }

  public get isGameClassificationState(): boolean {
    return this.type() === BoardCreatorStateType.GAME_CLASSIFICATION;
  }

  public get isPositionCreationState(): boolean {
    return this.type() === BoardCreatorStateType.POSITION_CREATION;
  }

  public get isSuccessState(): boolean {
    return this.type() === BoardCreatorStateType.SUCCESS;
  }

  public get isTerminalState(): boolean {
    return this.type() === BoardCreatorStateType.TERMINAL;
  }
}

export enum BoardCreatorStateType {
  BOARD_DESIGN = "BOARD_DESIGN",
  GAME_CLASSIFICATION = "GAME_CLASSIFICATION",
  POSITION_CREATION = "POSITION_CREATION",
  SUCCESS = "SUCCESS",
  TERMINAL = "TERMINAL",
}

type CreatorStateImplementations =
  | typeof BoardDesignState
  | typeof GameClassificationState
  | typeof TerminalState
  | typeof PositionCreationState
  | typeof SuccessState;
