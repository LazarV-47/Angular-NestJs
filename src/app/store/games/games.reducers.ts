import { createReducer, on } from '@ngrx/store';
import { loadGamesSuccess, addGameSuccess, deleteGameSuccess, updateGameSuccess, loadGames, loadGamesFailure, addGameFailure, updateGameFailure, deleteGameFailure } from './games.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Game } from './games.model';
import { updateGameReview } from '../reviews/reviews.actions';
import { GamesState } from './games.state';

// export interface GamesState extends EntityState<Game> {
//   loading: boolean;
//   error: string | null;
// }

export const adapter: EntityAdapter<Game> = createEntityAdapter<Game>();

export const initialState: GamesState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const gamesReducer = createReducer(
  initialState,
  on(loadGames, state => ({
    ...state, loading: true
  })),
  on(loadGamesSuccess, (state, { games }) => {
    return adapter.setAll(games, {
      ...state,
      loading: false,
      error: null,
    });
  }),
  on(loadGamesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addGameSuccess, (state, { game }) => {
    return adapter.addOne(game, state);
  }),
  on(addGameFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateGameSuccess, (state, { game }) => {
    return adapter.updateOne({ id: game.id, changes: game }, state);
  }),
  on(updateGameFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(deleteGameSuccess, (state, { gameId }) => {
    return adapter.removeOne(gameId, state);
  }),
  on(deleteGameFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // on(updateGameReview, (state, { gameId, review }) => {
  //   return adapter.updateOne({
  //     id: gameId,
  //     changes: { review }
  //   }, state);
  // })
  
);




export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();