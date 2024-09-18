import { createReducer, on } from '@ngrx/store';
import { loadGamesSuccess, addGameSuccess, deleteGameSuccess, updateGameSuccess } from './games.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Game } from './games.model';
import { updateGameReview } from '../reviews/reviews.actions';

export interface GamesState extends EntityState<Game> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Game> = createEntityAdapter<Game>();

export const initialState: GamesState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const gamesReducer = createReducer(
  initialState,
  on(loadGamesSuccess, (state, { games }) => adapter.setAll(games, state)),
  on(addGameSuccess, (state, { game }) => adapter.addOne(game, state)),
  on(deleteGameSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(updateGameSuccess, (state, { game }) => adapter.updateOne({ id: game.id, changes: game }, state)),
  on(updateGameReview, (state, { gameId, review }) => {
    return adapter.updateOne({
      id: gameId,
      changes: { review }
    }, state);
  })
  
);




export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();