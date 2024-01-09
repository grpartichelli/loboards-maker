import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { GameClassificationState } from "./game-classification.state";
import { BoardDesignState } from "./board-design.state";

export class PositionCreationState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.moveTo(GameClassificationState);
  }

  public acceptMessage(): string {
    return "Continuar";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.moveTo(BoardDesignState);
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
