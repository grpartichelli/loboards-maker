import { NavigationService } from "../../../commons/navigation.service";

export abstract class CreatorState {
  constructor(protected readonly navigationService: NavigationService) {}

  public abstract accept(): Promise<CreatorState>;
  public abstract reject(): Promise<CreatorState>;
  public abstract isTerminal(): boolean;
}
