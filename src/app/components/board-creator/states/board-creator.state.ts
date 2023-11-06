import { NavigationService } from "../../../commons/navigation.service";
import { ImageUploadState } from "./image-upload.state";
import { CancelState } from "./cancel.state";
import { BoardModel } from "../../../models/board.model";
import { LocalStorageService } from "../../../commons/local-storage.service";
import { PositionCreationState } from "./position-creation.state";

export abstract class BoardCreatorState {
  constructor(
    public readonly model: BoardModel,
    protected readonly localStorageService: LocalStorageService,
    protected readonly navigationService: NavigationService,
  ) {}

  public abstract accept(): Promise<BoardCreatorState>;
  public abstract reject(): Promise<BoardCreatorState>;
  public abstract isAcceptEnabled(): boolean;
  public abstract isTerminal(): boolean;
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
}

export enum CreatorStateType {
  CANCEL = "creator.cancel",
  IMAGE_UPLOAD = "creator.image-upload",
  POSITION_CREATION = "creator.position-creation",
}

type CreatorStateImplementations =
  | typeof ImageUploadState
  | typeof CancelState
  | typeof PositionCreationState;
