import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { GameClassificationState } from "./game-classification.state";
import { BoardDesignState } from "./board-design.state";

export class PositionCreationState extends BoardCreatorState {
  public confirm(): Promise<BoardCreatorState> {
    return this.moveTo(GameClassificationState);
  }

  public confirmMessage(): string {
    return "Continuar";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(BoardDesignState);
  }

  public isConfirmEnabled(): boolean {
    return (
      this.model.positions.length > 1 &&
      !this.model.positions.some((position) => !position.id.length)
    );
  }

  public type(): BoardCreatorStateType {
    return BoardCreatorStateType.POSITION_CREATION;
  }

  public progressPercentage(): number {
    return 50;
  }
}
