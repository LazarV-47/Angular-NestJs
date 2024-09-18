import { createAction, props } from '@ngrx/store';
import { Game } from './games.model';

export const loadGames = createAction(
    '[Games] Load Games'
);

export const loadGamesSuccess = createAction(
    '[Games] Load Games Success',
     props<{ games: Game[] }>()
    );

export const loadGamesFailure = createAction(
    '[Games] Load Games Failure',
     props<{ error: string }>()
    );



export const addGame = createAction(
    '[Games] Add Game',
    props<{ game: Partial<Game> }>()
    );

export const addGameSuccess = createAction(
    '[Games] Add Game Success',
     props<{ game: Game }>()
    );

export const addGameFailure = createAction(
    '[Games] Add Game Failure',
     props<{ error: string }>()
    );



export const deleteGame = createAction(
    '[Game] Delete Game',
    props<{ id: number }>()
    );
    
export const deleteGameSuccess = createAction(
    '[Game] Delete Game Success',
    props<{ id: number }>()
    );

export const deleteGameFailure = createAction(
    '[Game] Delete Game Failure',
    props<{ error: any }>()
    );

    

export const updateGame = createAction(
    '[Games] Update Game',
    props<{ game: Game }>()
    );
    
export const updateGameSuccess = createAction(
    '[Games] Update Game Success',
    props<{ game: Game }>()
);

export const updateGameFailure = createAction(
    '[Games] Update Game Failure',
    props<{ error: string }>()
);
      