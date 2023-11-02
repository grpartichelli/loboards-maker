import { BoardCreatorState, CreatorStateType } from "./board-creator.state";

export class CancelState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    return this.stayOnCurrentState();
  }

  public reject(): Promise<BoardCreatorState> {
    return this.stayOnCurrentState();
  }

  public isAcceptEnabled(): boolean {
    return false;
  }

  public isTerminal(): boolean {
    return true;
  }

  public type(): CreatorStateType {
    return CreatorStateType.CANCEL;
  }

  public progress(): number {
    return 0;
  }
}
