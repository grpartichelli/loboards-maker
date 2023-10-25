import { BoardCreatorState, CreatorStateType } from "./board-creator.state";
import { ImageUploadState } from "./image-upload.state";

export class PositionCreationState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.stayOnCurrentState();
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(ImageUploadState);
  }

  public isAcceptEnabled(): boolean {
    return true;
  }

  public isTerminal(): boolean {
    return false;
  }

  public type(): CreatorStateType {
    return CreatorStateType.POSITION_CREATION;
  }

  public progress(): number {
    return 66;
  }
}
