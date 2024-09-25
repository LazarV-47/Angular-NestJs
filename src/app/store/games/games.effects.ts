import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameService } from '../../services/game.service';
import { loadGames, loadGamesSuccess, loadGamesFailure, addGame, addGameSuccess, addGameFailure, deleteGame, deleteGameSuccess, deleteGameFailure, updateGame, updateGameSuccess, updateGameFailure } from './games.actions';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class GamesEffects {
  constructor(private actions$: Actions, private gameService: GameService, private router: Router) {}

  loadGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGames),
      mergeMap(() =>
        this.gameService.getGames().pipe(
          map(games => loadGamesSuccess({ games })),
          catchError(error => of(loadGamesFailure({ error })))
        )
      )
    )
  );

  

  addGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addGame),
      concatMap(({ game }) =>
        this.gameService.addGame(game).pipe(
          map(newGame => addGameSuccess({ game: newGame })),
          catchError(error => of(addGameFailure({ error })))
        )
      )
    )
  );

  redirectAfterAddGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addGameSuccess),
      tap(() => {
        this.router.navigate(['/game-list']);
      })
    ),
    { dispatch: false } 
  );


  updateGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateGame),
      concatMap(({ game }) =>
        this.gameService.updateGame(game).pipe(
          map(updatedGame => {
            // console.log('Update successful:', updatedGame);
            return updateGameSuccess({ game: updatedGame });
          }),
          catchError(error => of(updateGameFailure({ error })))
        )
      )
    )
  );

  deleteGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGame),
      mergeMap(action =>
        this.gameService.deleteGame(action.gameId).pipe(
          map(() => deleteGameSuccess({ gameId: action.gameId })),
          catchError(error => of(deleteGameFailure({ error })))
        )
      )
    )
  );


}
