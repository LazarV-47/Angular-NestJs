import { createReducer, on } from '@ngrx/store';
import { loadReviewSuccess, addReviewSuccess, editReviewSuccess, loadReviewFailure, deleteReviewSuccess, addReviewFailure, editReviewFailure, deleteReviewFailure, updateGameReview } from './reviews.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Review } from './reviews.model';

export interface ReviewsState extends EntityState<Review> {
  error: string | null;
}

export const adapter: EntityAdapter<Review> = createEntityAdapter<Review>();

export const initialState: ReviewsState = adapter.getInitialState({
  error: null,
});

export const reviewsReducer = createReducer(
  initialState,
  on(loadReviewSuccess, (state, { review }) => adapter.setOne(review, state)),
  on(addReviewSuccess, (state, { review }) => adapter.addOne(review, state)),
  on(addReviewFailure, (state, { error }) => ({...state, error})),
  on(editReviewSuccess, (state, { review }) => adapter.updateOne({ id: review.id, changes: review }, state)),
  on(deleteReviewSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(loadReviewFailure, addReviewFailure, editReviewFailure, deleteReviewFailure, (state, { error }) => ({ ...state, error })),
);


export const {
  selectAll,
} = adapter.getSelectors();