import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { ImageUploadState } from "./image-upload.state";
import { SuccessState } from "./success.state";

export class PositionCreationState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.moveTo(SuccessState);
  }

  public acceptMessage(): string {
    return "Baixar";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(ImageUploadState);
  }

  public isAcceptEnabled(): boolean {
    return (
      this.model.positions.length > 1 &&
      !this.model.positions.some((position) => !position.id.length)
    );
  }

  public type(): BoardCreatorStateType {
    return BoardCreatorStateType.POSITION_CREATION;
  }

  public progress(): number {
    return 75;
  }
}
