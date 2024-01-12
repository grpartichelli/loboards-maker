import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { PositionCreationState } from "./position-creation.state";
import { TerminalState } from "./terminal.state";
import { BoardModel } from "../../../models/board.model";
import { GameClassificationState } from "./game-classification.state";

export class SuccessState extends BoardCreatorState {
  public confirm() {
    this.model = new BoardModel();
    this.localStorageService.clearData();
    return this.moveTo(TerminalState);
  }

  public confirmMessage() {
    return "Concluir";
  }

  public reject() {
    return this.moveTo(GameClassificationState);
  }

  public isConfirmEnabled() {
    return true;
  }

  public type() {
    return BoardCreatorStateType.SUCCESS;
  }

  public progress() {
    return 100;
  }
}
