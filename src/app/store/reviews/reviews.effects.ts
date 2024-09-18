import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReviewService } from '../../services/review.service';
import { loadReview, loadReviewSuccess, loadReviewFailure, addReview, addReviewSuccess, addReviewFailure, editReview, editReviewFailure, editReviewSuccess, deleteReviewSuccess, deleteReviewFailure, deleteReview, updateGameReview } from './reviews.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';

@Injectable()
export class ReviewsEffects {
  constructor(private actions$: Actions, private reviewService: ReviewService) {}

  loadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReview),
      mergeMap(({ gameId }) =>
        this.reviewService.getReviewByGameId(gameId).pipe(
          //tap(review => console.log(review)),
          map(review => loadReviewSuccess({ review })),
          catchError(error => of(loadReviewFailure({ error })))
        )
      )
    )
  );

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addReview),
      tap(({ review }) => console.log('Effect triggered with review:', review)),
      switchMap(({ review }) =>
        this.reviewService.addReview(review).pipe(
          tap(newReview => console.log('Review added:', newReview)),
          map(newReview => addReviewSuccess({ review: newReview })),
          catchError(error => of(addReviewFailure({ error })))
        )
      )
    )
  );

  updateGameAfterReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addReviewSuccess, editReviewSuccess),
      tap(({ review }) => console.log('Effect triggered with review:', review)),
      map(({ review }) => 
        updateGameReview({ gameId: review.gameId, review }))
    )
  );

  editReview$ = createEffect(() =>
    this.actions$.pipe(
        ofType(editReview),
        switchMap(({ review }) =>
            this.reviewService.updateReview(review).pipe(
                tap(newReview => console.log('Review edited:', newReview)),
                map(updatedReview => editReviewSuccess({ review: updatedReview })),
                catchError(error => of(editReviewFailure({ error })))
            )
        )
    )
);

deleteReview$ = createEffect(() =>
  this.actions$.pipe(
    ofType(deleteReview),
    mergeMap(({ id }) =>
      this.reviewService.getReview(id).pipe(
        mergeMap(review => {
          if (review && review.gameId) {
            return this.reviewService.deleteReview(id).pipe(
              map(() => deleteReviewSuccess({ id: review.id, gameId: review.gameId })),
              catchError(error => of(deleteReviewFailure({ error })))
            );
          } else {
            return of(deleteReviewFailure({ error: 'Review or Game not found' }));
          }
        }),
        catchError(error => of(deleteReviewFailure({ error })))
      )
    )
  )
);

updateGameAfterReviewDelete$ = createEffect(() =>
  this.actions$.pipe(
    ofType(deleteReviewSuccess),
    map(({ gameId }) => updateGameReview({ gameId: gameId, review: undefined }))
  )
);
  
}
