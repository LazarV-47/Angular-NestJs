import { User } from "../../auth/user.model";
import { Game } from "../games/games.model";

export interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    game: Game;
    user: User;
  }
  