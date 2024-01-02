import {
  BoardCreatorState,
  BoardCreatorStateType,
} from "./board-creator.state";
import { SuccessState } from "./success.state";
import { PositionCreationState } from "./position-creation.state";
import { BoardConfig } from "../../../models/board.config";
import { Strings } from "../../../commons/strings";

export class GameClassificationState extends BoardCreatorState {
  public accept() {
    const config = BoardConfig.fromBoardModel(this.model);
    const text = JSON.stringify(config);
    const name = Strings.toKebabCase(this.model.name) + "-loboards-config.txt";
    this.fileService.downloadTxt(text, name);
    return this.moveTo(SuccessState);
  }

  public acceptMessage() {
    return "Baixar";
  }

  public reject() {
    return this.moveTo(PositionCreationState);
  }

  public isAcceptEnabled() {
    return !this.model.games.some((game) => game.name?.length < 2);
  }

  public type() {
    return BoardCreatorStateType.GAME_CLASSIFICATION;
  }

  public progress() {
    return 75;
  }
}
