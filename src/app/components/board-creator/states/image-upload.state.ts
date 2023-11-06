import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { PositionCreationState } from "./position-creation.state";
import { BoardSelectState } from "./board-select.state";

export class ImageUploadState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.moveTo(PositionCreationState);
  }

  public acceptMessage(): string {
    return "Continuar";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(BoardSelectState);
  }

  public isAcceptEnabled(): boolean {
    return this.model.isImageLoadedCorrectly;
  }

  public type(): BoardCreatorStateType {
    return BoardCreatorStateType.IMAGE_UPLOAD;
  }

  public progress(): number {
    return 50;
  }
}
