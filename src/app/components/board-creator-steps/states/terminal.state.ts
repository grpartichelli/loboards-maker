import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";

export class TerminalState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.stayOnCurrentState();
  }

  public acceptMessage(): string {
    return "";
  }

  public reject(): Promise<BoardCreatorState> {
    return this.stayOnCurrentState();
  }

  public isAcceptEnabled(): boolean {
    return false;
  }

  public type(): BoardCreatorStateType {
    return BoardCreatorStateType.TERMINAL;
  }

  public progress(): number {
    return 0;
  }
}
