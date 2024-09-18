import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameService } from '../../services/game.service';
import { loadGames, loadGamesSuccess, loadGamesFailure, addGame, addGameSuccess, addGameFailure, deleteGame, deleteGameSuccess, deleteGameFailure, updateGame, updateGameSuccess, updateGameFailure } from './games.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { addReview } from '../reviews/reviews.actions';
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
      switchMap(({ game }) =>
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


  deleteGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGame),
      mergeMap(action =>
        this.gameService.deleteGame(action.id).pipe(
          map(() => deleteGameSuccess({ id: action.id })),
          catchError(error => of(deleteGameFailure({ error })))
        )
      )
    )
  );



  updateGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateGame),
      switchMap(({ game }) => {
        const formData = new FormData();
        formData.append('title', game.title);
        formData.append('genre', game.genre);
        formData.append('status', game.status);
        formData.append('description', game.description || '');
        if (game.picture) {
          formData.append('picture', game.picture);
        }
        
        return this.gameService.updateGame(game.id, formData).pipe(
          map(updatedGame => {
            // console.log('Update successful:', updatedGame);
            return updateGameSuccess({ game: updatedGame });
          }),
          catchError(error => of(updateGameFailure({ error })))
        );
      })
    )
  );
}
