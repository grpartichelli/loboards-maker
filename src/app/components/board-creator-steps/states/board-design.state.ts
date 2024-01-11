import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { PositionCreationState } from "./position-creation.state";
import { TerminalState } from "./terminal.state";

export class BoardDesignState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.moveTo(PositionCreationState);
  }

  public acceptMessage(): string {
    return "Iniciar";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(TerminalState);
  }

  public isAcceptEnabled(): boolean {
    return this.model.name.length > 2 && this.model.isImageLoadedCorrectly;
  }

  public type(): BoardCreatorStateType {
    return BoardCreatorStateType.BOARD_DESIGN;
  }

  public progress(): number {
    return 25;
  }
}
