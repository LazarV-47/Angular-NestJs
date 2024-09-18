import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GamesState, adapter } from './games.reducers';

export const selectGamesState = createFeatureSelector<GamesState>('games');

export const { selectAll: selectAllGames } = adapter.getSelectors(selectGamesState);


export const selectGamesLoading = createSelector(
    selectGamesState,
    (state: GamesState) => state.loading
  );
  
  export const selectGamesError = createSelector(
    selectGamesState,
    (state: GamesState) => state.error
  );

  

  export const selectLatestGame = createSelector(
    selectAllGames,
    (games) => games[games.length - 1]
  );
  

  export const selectGameById = (gameId: number) => createSelector(
    selectGamesState,
    (state: GamesState) => state.entities[gameId]
  );

