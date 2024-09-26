import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from './review.reducers';
import { selectAllGames } from '../games/games.selectors';
import { ReviewsState } from './reviews.state';

export const selectReviewsState = createFeatureSelector<ReviewsState>('reviews');

export const { selectIds, selectEntities, selectAll: selectAllReviews, selectTotal } = adapter.getSelectors(selectReviewsState);


export const selectReviewById = (reviewId: number) => createSelector(
  selectReviewsState,
  (state: ReviewsState) => state.entities[reviewId]
);

export const selectReviewsByGameId = (gameId: number) => createSelector(
  selectAllReviews,
  reviews => reviews.filter(review => review.game.id === gameId)
);

export const selectUserReviewByGameId = (gameId: number, userId: number) =>
  createSelector(selectAllReviews,
     reviews => {
    //console.log('Reviews for User and Game:', reviews, { gameId, userId });
    return reviews.find(review => review.game.id === gameId && review.user.id === userId) || null;
  });

export const selectReviewLoading = createSelector(
  selectReviewsState,
  (state: ReviewsState) => state.loading
);

export const selectReviewError = createSelector(
  selectReviewsState,
  (state: ReviewsState) => state.error
);