import { BoardCreatorState, CreatorStateType } from "./board-creator.state";
import { TerminalState } from "./terminal.state";
import { PositionCreationState } from "./position-creation.state";

export class ImageUploadState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.moveTo(PositionCreationState);
  }

  public acceptMessage(): string {
    return "Continuar";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(TerminalState);
  }

  public isAcceptEnabled(): boolean {
    return this.model.isImageLoadedCorrectly;
  }

  public type(): CreatorStateType {
    return CreatorStateType.IMAGE_UPLOAD;
  }

  public progress(): number {
    return 33;
  }
}
