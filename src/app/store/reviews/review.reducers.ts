import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Review } from './reviews.model';
import { ReviewsState } from './reviews.state';
import { addReviewFailure, addReviewSuccess, deleteReviewFailure, deleteReviewSuccess, loadAllReviewsFailure, loadAllReviewsSuccess, loadReviews, loadReviewsFailure, loadReviewsSuccess, updateReviewFailure, updateReviewSuccess } from './reviews.actions';

export const adapter: EntityAdapter<Review> = createEntityAdapter<Review>();

// Initial state for the review store
export const initialState: ReviewsState = adapter.getInitialState({
  loading: false,
  error: null
});

// Define the review reducer
export const reviewsReducer = createReducer(
  initialState,
  on(loadReviews, (state) => ({
    ...state,
    loading: true
  })),
  on(loadReviewsSuccess, (state, { reviews }) => {
    return adapter.setAll(reviews, {
      ...state,
      loading: false,
      error: null
    });
  }),
  on(loadReviewsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(addReviewSuccess, (state, { review }) => {
    return adapter.addOne(review, {
      ...state,
      loading: false,
      error: null
    });
  }),
  on(addReviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(updateReviewSuccess, (state, { review }) => {
    return adapter.updateOne({ id: review.id, changes: review }, state);
  }),
  on(updateReviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(deleteReviewSuccess, (state, { reviewId }) => {
    return adapter.removeOne(reviewId, state);
  }),
  on(deleteReviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(loadAllReviewsSuccess, (state, { reviews }) => {
    return adapter.setAll(reviews, {
      ...state,
      loading: false,
      error: null,
    });
  }),
  on(loadAllReviewsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);