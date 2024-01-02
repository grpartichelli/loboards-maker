import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { SuccessState } from "./success.state";
import { BoardConfig } from "../../../models/board.config";
import { Strings } from "../../../commons/strings";
import { GameClassificationState } from "./game-classification.state";
import { BoardSelectState } from "./board-select.state";

export class PositionCreationState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.moveTo(GameClassificationState);
  }

  public acceptMessage(): string {
    return "Continuar";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(BoardSelectState);
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
    return 50;
  }
}
