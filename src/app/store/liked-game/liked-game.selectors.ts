import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LikedGameState } from "./liked-game.state";
import { adapter } from "./liked-game.reducer";

export const selectLikedGameState = createFeatureSelector<LikedGameState>('likedGames');


export const {
  selectIds: selectLikedGameIds,
  selectEntities: selectLikedGameEntities,
  selectAll: selectAllLikedGames,
  selectTotal: selectLikedGameTotal,
} = adapter.getSelectors(selectLikedGameState);

export const selectIsGameLiked = (gameId: number, userId: number) =>
  createSelector(selectLikedGameEntities, (entities) => {
    console.log('Liked Game Entities:', entities); 
    return Object.values(entities).some((likedGame: any) => likedGame.game.id === gameId && likedGame.user.id === userId);
  });

export const selectLikedGameStatus = (gameId: number) =>
  createSelector(selectLikedGameEntities, (entities) => entities[gameId]?.status || 'Want to Play');


// Selector to get the loading state
export const selectLikedGamesLoading = createSelector(
  selectLikedGameState,
  (state: LikedGameState) => state.loading
);

// Selector to get any error
export const selectLikedGamesError = createSelector(
  selectLikedGameState,
  (state: LikedGameState) => state.error
);