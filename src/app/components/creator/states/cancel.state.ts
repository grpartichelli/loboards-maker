import { CreatorState, CreatorStateType } from "./creator.state";

export class CancelState extends CreatorState {
  public accept(): Promise<CreatorState> {
    return this.stayOnCurrentState();
  }

  public reject(): Promise<CreatorState> {
    return this.stayOnCurrentState();
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
