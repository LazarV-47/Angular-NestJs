import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReviewService } from '../../services/review.service';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { addReview, addReviewFailure, addReviewSuccess, deleteReview, deleteReviewFailure, deleteReviewSuccess, loadAllReviews, loadAllReviewsFailure, loadAllReviewsSuccess, loadReviews, loadReviewsFailure, loadReviewsSuccess, updateReview, updateReviewFailure, updateReviewSuccess } from './reviews.actions';
import { Router } from '@angular/router';

@Injectable()
export class ReviewsEffects {
  constructor(private actions$: Actions, private reviewService: ReviewService, private router: Router) {}

  loadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReviews),
      mergeMap((action) =>
        this.reviewService.getReviewsByGameId(action.gameId).pipe(
          map((reviews) => loadReviewsSuccess({ reviews })),
          catchError((error) => of(loadReviewsFailure({ error })))
        )
      )
    )
  );

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addReview),
      concatMap((action) =>
        this.reviewService.addReview(action.review).pipe(
          map((review) => addReviewSuccess({ review })),
          catchError((error) => of(addReviewFailure({ error })))
        )
      )
    )
  );

  addReviewSuccessNavigate = createEffect(() =>
    this.actions$.pipe(
      ofType(addReviewSuccess, updateReviewSuccess),
      concatMap((action) => {
        const gameId = action.review.game.id;
        return this.router.navigate(['/game-detail', gameId]);
      })
    ),
    { dispatch: false }
  );

  updateReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateReview),
      concatMap((action) =>
        this.reviewService.updateReview(action.review).pipe(
          map((review) => updateReviewSuccess({ review })),
          catchError((error) => of(updateReviewFailure({ error })))
        )
      )
    )
  );

  deleteReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteReview),
      mergeMap((action) =>
        this.reviewService.deleteReview(action.reviewId).pipe(
          map(() => deleteReviewSuccess({ reviewId: action.reviewId })),
          catchError((error) => of(deleteReviewFailure({ error })))
        )
      )
    )
  );

  loadAllReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllReviews),
      mergeMap(() =>
        this.reviewService.getAllReviews().pipe(
          map((reviews) => loadAllReviewsSuccess({ reviews })),
          catchError((error) => of(loadAllReviewsFailure({ error })))
        )
      )
    )
  );
}
