import { createAction, props } from '@ngrx/store';
import { Review } from './reviews.model';
import { ReviewDTO } from '../../dto/review.dto';
import { UpdateReviewDTO } from '../../dto/update-review.dto';

export const loadReviews = createAction('[Review] Load Reviews', props<{ gameId: number }>());
export const loadReviewsSuccess = createAction('[Review] Load Reviews Success', props<{ reviews: Review[] }>());
export const loadReviewsFailure = createAction('[Review] Load Reviews Failure', props<{ error: string }>());


export const loadAllReviews = createAction('[Review] Load All Reviews');
export const loadAllReviewsSuccess = createAction('[Review] Load All Reviews Success', props<{ reviews: Review[] }>());
export const loadAllReviewsFailure = createAction('[Review] Load All Reviews Failure', props<{ error: string }>());


export const addReview = createAction('[Review] Add Review', props<{ review: ReviewDTO }>());
export const addReviewSuccess = createAction('[Review] Add Review Success', props<{ review: Review }>());
export const addReviewFailure = createAction('[Review] Add Review Failure', props<{ error: string }>());


export const updateReview = createAction('[Review] Update Review', props<{ review: UpdateReviewDTO }>());
export const updateReviewSuccess = createAction('[Review] Update Review Success', props<{ review: Review }>());
export const updateReviewFailure = createAction('[Review] Update Review Failure', props<{ error: string }>());


export const deleteReview = createAction('[Review] Delete Review', props<{ reviewId: number }>());
export const deleteReviewSuccess = createAction('[Review] Delete Review Success', props<{ reviewId: number }>());
export const deleteReviewFailure = createAction('[Review] Delete Review Failure', props<{ error: string }>());
