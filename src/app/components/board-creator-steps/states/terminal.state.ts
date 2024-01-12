import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";

export class TerminalState extends BoardCreatorState {
  public confirm(): Promise<BoardCreatorState> {
    return this.stayOnCurrentState();
  }

  public confirmMessage(): string {
    return "";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.stayOnCurrentState();
  }

  public isConfirmEnabled(): boolean {
    return false;
  }

  public type(): BoardCreatorStateType {
    return BoardCreatorStateType.TERMINAL;
  }

  public progressPercentage(): number {
    return 0;
  }
}
