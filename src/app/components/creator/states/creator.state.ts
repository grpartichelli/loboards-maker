import { NavigationService } from "../../../commons/navigation.service";
import { ImageUploadState } from "./image-upload.state";
import { CancelState } from "./cancel.state";

export abstract class CreatorState {
  constructor(protected readonly navigationService: NavigationService) {}

  public abstract accept(): Promise<CreatorState>;
  public abstract reject(): Promise<CreatorState>;
  public abstract isTerminal(): boolean;
  public abstract type(): CreatorStateType;
  public abstract progress(): number;

  public moveTo(state: CreatorStateImplementations): Promise<CreatorState> {
    return Promise.resolve(new state(this.navigationService));
  }

  public stayOnCurrentState(): Promise<CreatorState> {
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
