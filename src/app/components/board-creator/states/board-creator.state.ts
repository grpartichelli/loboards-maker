import { NavigationService } from "../../../commons/navigation.service";
import { ImageUploadState } from "./image-upload.state";
import { TerminalState } from "./terminal.state";
import { BoardModel } from "../../../models/board.model";
import { LocalStorageService } from "../../../commons/local-storage.service";
import { PositionCreationState } from "./position-creation.state";
import { SuccessState } from "./success.state";

export abstract class BoardCreatorState {
  constructor(
    public readonly model: BoardModel,
    protected readonly localStorageService: LocalStorageService,
    protected readonly navigationService: NavigationService,
  ) {}

  public abstract accept(): Promise<BoardCreatorState>;
  public abstract acceptMessage(): string;
  public abstract reject(): Promise<BoardCreatorState>;
  public abstract isAcceptEnabled(): boolean;
  public abstract type(): CreatorStateType;
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

  public get isImageUploadState(): boolean {
    return this.type() === CreatorStateType.IMAGE_UPLOAD;
  }

  public get isPositionCreationState(): boolean {
    return this.type() === CreatorStateType.POSITION_CREATION;
  }

  public get isSuccessState(): boolean {
    return this.type() === CreatorStateType.SUCCESS;
  }

  public get isTerminalState(): boolean {
    return this.type() === CreatorStateType.TERMINAL;
  }
}

export enum CreatorStateType {
  IMAGE_UPLOAD = "creator.state.image-upload",
  POSITION_CREATION = "creator.state.position-creation",
  SUCCESS = "creator.state.success",
  TERMINAL = "creator.state.cancel",
}

type CreatorStateImplementations =
  | typeof ImageUploadState
  | typeof TerminalState
  | typeof PositionCreationState
  | typeof SuccessState;
