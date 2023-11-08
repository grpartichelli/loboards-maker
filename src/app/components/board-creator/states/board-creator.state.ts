import { NavigationService } from "../../../commons/navigation.service";
import { ImageUploadState } from "./image-upload.state";
import { TerminalState } from "./terminal.state";
import { BoardModel } from "../../../models/board.model";
import { LocalStorageService } from "../../../commons/local-storage.service";
import { PositionCreationState } from "./position-creation.state";
import { SuccessState } from "./success.state";

export abstract class BoardCreatorState {
  constructor(
    public model: BoardModel,
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
      this.localStorageService,
      this.navigationService,
    );
    this.localStorageService.saveData("board", this.model);
    this.localStorageService.saveData("state", nextState.type());
    return Promise.resolve(nextState);
  }

  public stayOnCurrentState(): Promise<BoardCreatorState> {
    return Promise.resolve(this);
  }

  public get isBoardSelectState(): boolean {
    return this.type() === BoardCreatorStateType.BOARD_SELECT;
  }

  public get isImageUploadState(): boolean {
    return this.type() === BoardCreatorStateType.IMAGE_UPLOAD;
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
  BOARD_SELECT = "board.creator.state.board-select",
  IMAGE_UPLOAD = "board.creator.state.image-upload",
  POSITION_CREATION = "board.creator.state.position-creation",
  SUCCESS = "board.creator.state.success",
  TERMINAL = "board.creator.state.cancel",
}

type CreatorStateImplementations =
  | typeof ImageUploadState
  | typeof TerminalState
  | typeof PositionCreationState
  | typeof SuccessState;
