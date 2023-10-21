import { CreatorState, CreatorStateType } from "./creator.state";
import { CancelState } from "./cancel.state";

export class ImageUploadState extends CreatorState {
  public accept(): Promise<CreatorState> {
    return this.stayOnCurrentState();
  }

  public reject(): Promise<CreatorState> {
    return this.moveTo(CancelState);
  }

  public isTerminal(): boolean {
    return false;
  }

  public type(): CreatorStateType {
    return CreatorStateType.IMAGE_UPLOAD;
  }

  public progress(): number {
    return 50;
  }
}
