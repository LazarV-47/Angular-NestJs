import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewsState, adapter } from './review.reducers';
import { selectAllGames } from '../games/games.selectors';

export const selectReviewsState = createFeatureSelector<ReviewsState>('reviews');

export const { selectAll: selectAllReviews } = adapter.getSelectors(selectReviewsState);



export const selectReviewById = (reviewId: number) => createSelector(
  selectReviewsState,
  (state: ReviewsState) => state.entities[reviewId]
);

export const selectReviewsByGameId = (gameId: number) => createSelector(
  selectAllReviews,
  reviews => reviews.filter(review => review.gameId === gameId)
);
