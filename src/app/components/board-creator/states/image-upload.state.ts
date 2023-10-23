import { BoardCreatorState, CreatorStateType } from "./board-creator.state";
import { CancelState } from "./cancel.state";

export class ImageUploadState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.stayOnCurrentState();
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(CancelState);
  }

  public isAcceptEnabled(): boolean {
    return Boolean(this.model.image.src);
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
