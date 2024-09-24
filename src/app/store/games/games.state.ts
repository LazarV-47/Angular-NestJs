import { EntityState } from "@ngrx/entity";
import { Game } from "./games.model";

export interface GamesState extends EntityState<Game>{
  loading: boolean;
  error: string | null;
}

