import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { PositionCreationState } from "./position-creation.state";
import { TerminalState } from "./terminal.state";

export class BoardSelectState extends BoardCreatorState {
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

  public type(): BoardCreatorStateType {
    return BoardCreatorStateType.BOARD_SELECT;
  }

  public progress(): number {
    return 33;
  }
}
