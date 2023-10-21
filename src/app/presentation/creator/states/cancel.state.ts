import { CreatorState } from "./creator.state";

export class CancelState extends CreatorState {
  public accept(): Promise<CreatorState> {
    return Promise.resolve(this);
  }

  public reject(): Promise<CreatorState> {
    return this.navigationService.navigateToHome().then(() => this);
  }

  public isTerminal(): boolean {
    return true;
  }
}
