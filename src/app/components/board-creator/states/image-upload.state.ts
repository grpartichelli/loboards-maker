import { BoardCreatorState, CreatorStateType } from "./board-creator.state";
import { CancelState } from "./cancel.state";
import { PositionCreationState } from "./position-creation.state";

export class ImageUploadState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.moveTo(PositionCreationState);
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(CancelState);
  }

  public isAcceptEnabled(): boolean {
    return this.model.isImageLoadedCorrectly;
  }

  public isTerminal(): boolean {
    return false;
  }

  public type(): CreatorStateType {
    return CreatorStateType.IMAGE_UPLOAD;
  }

  public progress(): number {
    return 33;
  }
}
