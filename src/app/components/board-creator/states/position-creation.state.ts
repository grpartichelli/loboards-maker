import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { BoardSelectState } from "./board-select.state";
import { SuccessState } from "./success.state";
import { BoardConfig } from "../../../models/board.config";
import { Strings } from "../../../commons/strings";

export class PositionCreationState extends BoardCreatorState {
  public accept(): Promise<BoardCreatorState> {
    const config = BoardConfig.fromBoardModel(this.model);
    const text = JSON.stringify(config);
    const name = Strings.toKebabCase(this.model.name) + "-loboards-config.txt";
    this.fileService.downloadTxt(text, name);
    return this.moveTo(SuccessState);
  }

  public acceptMessage(): string {
    return "Baixar";
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
    return 66;
  }
}
