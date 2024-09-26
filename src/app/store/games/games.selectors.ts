import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from './games.reducers';
import { GamesState } from './games.state';

export const selectGamesState = createFeatureSelector<GamesState>('games');

export const { 
  selectAll: selectAllGames, 
  selectEntities: selectGameEntities, 
  selectIds: selectGameIds 
} = adapter.getSelectors(selectGamesState);


export const selectGamesLoading = createSelector(
    selectGamesState,
    (state: GamesState) => state.loading
);
 
export const selectGamesError = createSelector(
  selectGamesState,
  (state: GamesState) => state.error
);


export const selectGameById = (gameId: number) => createSelector(
  selectGameEntities, (entities) => entities[gameId]
);

export const selectFilteredGames = (searchTerm: string) => createSelector(
  selectAllGames,
  (games) => {
    if (!searchTerm) return games;
    return games.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
);
