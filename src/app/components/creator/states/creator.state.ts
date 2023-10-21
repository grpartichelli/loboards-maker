import { NavigationService } from "../../../commons/navigation.service";

export abstract class CreatorState {
  constructor(protected readonly navigationService: NavigationService) {}

  public abstract accept(): Promise<CreatorState>;
  public abstract reject(): Promise<CreatorState>;
  public abstract isTerminal(): boolean;
  public abstract type(): CreatorStateType;

  public get isImageUploadState(): boolean {
    return this.type() === CreatorStateType.IMAGE_UPLOAD;
  }
}

export enum CreatorStateType {
  IMAGE_UPLOAD = "creator.image-upload",
  CANCEL = "creator.cancel",
}
