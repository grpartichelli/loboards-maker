import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { PositionCreationState } from "./position-creation.state";
import { TerminalState } from "./terminal.state";

export class SuccessState extends BoardCreatorState {
  public accept() {
    return this.moveTo(TerminalState);
  }

  public acceptMessage() {
    return "Concluir";
  }

  public reject() {
    return this.moveTo(PositionCreationState);
  }

  public isAcceptEnabled() {
    return true;
  }

  public type() {
    return BoardCreatorStateType.SUCCESS;
  }

  public progress() {
    return 100;
  }
}
