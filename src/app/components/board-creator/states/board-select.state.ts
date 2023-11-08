import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { ImageUploadState } from "./image-upload.state";
import { TerminalState } from "./terminal.state";

export class BoardSelectState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.moveTo(ImageUploadState);
  }

  public acceptMessage(): string {
    return "Continuar";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(TerminalState);
  }

  public isAcceptEnabled(): boolean {
    return true;
  }

  public type(): BoardCreatorStateType {
    return BoardCreatorStateType.BOARD_SELECT;
  }

  public progress(): number {
    return 25;
  }
}
