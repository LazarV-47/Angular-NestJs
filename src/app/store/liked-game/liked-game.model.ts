import { User } from "../../auth/user.model";
import { Game } from "../games/games.model";

export interface LikedGame {
    id: number;
    game: Game;
    user: User;
    status: string;
  }