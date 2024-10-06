import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { LikedGame } from "./liked-game.model";
import { LikedGameState } from "./liked-game.state";
import { createReducer, on } from "@ngrx/store";
import { addLikedGame, addLikedGameFailure, addLikedGameSuccess, loadLikedGames, loadLikedGamesFailure, loadLikedGamesSuccess, unlikeGameFailure, unlikeGameSuccess } from "./liked-game.actions";
import { deleteGameSuccess } from "../games/games.actions";


export const adapter: EntityAdapter<LikedGame> = createEntityAdapter<LikedGame>({
    selectId: (likedGame: LikedGame) => likedGame.id,
  });
  

export const initialState: LikedGameState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const likedGameReducer = createReducer(
  initialState,
  on(loadLikedGames, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadLikedGamesSuccess, (state, { likedGames }) =>
    adapter.setAll(likedGames, { ...state, loading: false })
  ),
  on(addLikedGame, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(addLikedGameSuccess, (state, { likedGame }) =>
    adapter.addOne(likedGame, {
      ...state,
      loading: false,
    })
  ),
  on(unlikeGameSuccess, (state, { likedGameId }) => 
    adapter.removeOne(likedGameId, {
       ...state,
      loading: false 
    })
  ),
  on(
    addLikedGameFailure,
    unlikeGameFailure,
    loadLikedGamesFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),
  on(deleteGameSuccess, (state, { gameId }) => {
    return adapter.removeMany(
      (likedGame) => likedGame.game.id === gameId,
      state
    );
  })
);