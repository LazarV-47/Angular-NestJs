import { EntityState } from "@ngrx/entity";
import { Game } from "./games.model";

export interface GameState extends EntityState<Game>{
  loading: boolean;
  error: string | null;
}

