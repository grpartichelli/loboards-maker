import { NavigationService } from "../../../commons/navigation.service";
import { BoardSelectState } from "./board-select.state";
import { TerminalState } from "./terminal.state";
import { BoardModel } from "../../../models/board.model";
import { LocalStorageService } from "../../../commons/local-storage.service";
import { PositionCreationState } from "./position-creation.state";
import { SuccessState } from "./success.state";
import { BoardConfig } from "../../../models/board.config";
import { FileService } from "../../../commons/file.service";
import { GameClassificationState } from "./game-classification.state";

export abstract class BoardCreatorState {
  constructor(
    public model: BoardModel,
    protected readonly fileService: FileService,
    protected readonly localStorageService: LocalStorageService,
    protected readonly navigationService: NavigationService,
  ) {}

  public abstract accept(): Promise<BoardCreatorState>;
  public abstract acceptMessage(): string;
  public abstract reject(): Promise<BoardCreatorState>;
  public abstract isAcceptEnabled(): boolean;
  public abstract type(): BoardCreatorStateType;
  public abstract progress(): number;

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

  public get isBoardSelectState(): boolean {
    return this.type() === BoardCreatorStateType.BOARD_SELECT;
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
  BOARD_SELECT = "board-select",
  GAME_CLASSIFICATION = "game-classification",
  POSITION_CREATION = "position-creation",
  SUCCESS = "success",
  TERMINAL = "terminal",
}

type CreatorStateImplementations =
  | typeof BoardSelectState
  | typeof GameClassificationState
  | typeof TerminalState
  | typeof PositionCreationState
  | typeof SuccessState;
