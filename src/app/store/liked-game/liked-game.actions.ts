import { createAction, props } from "@ngrx/store";
import { LikedGame } from "./liked-game.model";

export const addLikedGame = createAction(
    '[Liked Game] Add Liked Game',
    props<{ gameId: number, status: string }>()
);

export const addLikedGameSuccess = createAction(
    '[Liked Game] Add Liked Game Success',
    props<{ likedGame: LikedGame }>()
);

export const addLikedGameFailure = createAction(
    '[Liked Game] Add Liked Game Failure',
    props<{ error: any }>()
);



export const loadLikedGames = createAction('[Liked Game] Load Liked Games');

export const loadLikedGamesSuccess = createAction(
  '[Liked Game] Load Liked Games Success',
  props<{ likedGames: LikedGame[] }>()
);

export const loadLikedGamesFailure = createAction(
  '[Liked Game] Load Liked Games Failure',
  props<{ error: any }>()
);



export const unlikeGame = createAction(
  '[Liked Game] Unlike Game',
  props<{ gameId: number }>()
);

export const unlikeGameSuccess = createAction(
  '[Liked Game] Unlike Game Success',
  props<{ likedGameId: number }>()
);

export const unlikeGameFailure = createAction(
  '[Liked Game] Unlike Game Failure',
  props<{ error: any }>()
);

