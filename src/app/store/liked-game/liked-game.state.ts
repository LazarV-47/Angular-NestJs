import { EntityState } from "@ngrx/entity";
import { LikedGame } from "./liked-game.model";


export interface LikedGameState extends EntityState<LikedGame> {
    loading: boolean;
    error: any | null;
}