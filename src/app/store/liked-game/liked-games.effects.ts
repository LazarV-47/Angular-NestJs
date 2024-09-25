import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";
import { addLikedGame, addLikedGameFailure, addLikedGameSuccess, loadLikedGames, loadLikedGamesFailure, loadLikedGamesSuccess, unlikeGame, unlikeGameFailure, unlikeGameSuccess } from "./liked-game.actions";
import { LikedGameService } from "../../services/liked-game.service";

@Injectable()
export class LikedGameEffects {
  private backendUrl = environment.backendUrl;

  constructor(private actions$: Actions, private likedGameService: LikedGameService) {}

  loadLikedGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLikedGames),
      mergeMap(() =>
        this.likedGameService.getLikedGames().pipe(
          map(likedGames => loadLikedGamesSuccess({ likedGames })),
          catchError(error => of(loadLikedGamesFailure({ error })))
        )
      )
    )
  );

  addLikedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addLikedGame),
      mergeMap(({ gameId, status }) =>
        this.likedGameService.addLikedGame(gameId, status).pipe(
          map(likedGame => addLikedGameSuccess({ likedGame })),
          catchError(error => of(addLikedGameFailure({ error })))
        )
      )
    )
  );

  unlikeGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unlikeGame),
      mergeMap(({ gameId }) =>
        this.likedGameService.unlikeGame(gameId).pipe(
          map(({ likedGameId }) => unlikeGameSuccess({ likedGameId })),
          catchError((error) => of(unlikeGameFailure({ error })))
        )
      )
    )
  );
}