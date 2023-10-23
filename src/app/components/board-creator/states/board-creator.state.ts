import { NavigationService } from "../../../commons/navigation.service";
import { ImageUploadState } from "./image-upload.state";
import { CancelState } from "./cancel.state";
import { BoardModel } from "../../../models/board.model";

export abstract class BoardCreatorState {
  constructor(
    public readonly model: BoardModel,
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
    return Promise.resolve(new state(this.model, this.navigationService));
  }

  public stayOnCurrentState(): Promise<BoardCreatorState> {
    return Promise.resolve(this);
  }

  public get isImageUploadState(): boolean {
    return this.type() === CreatorStateType.IMAGE_UPLOAD;
  }
}

export enum CreatorStateType {
  IMAGE_UPLOAD = "creator.image-upload",
  CANCEL = "creator.cancel",
}

type CreatorStateImplementations = typeof ImageUploadState | typeof CancelState;
