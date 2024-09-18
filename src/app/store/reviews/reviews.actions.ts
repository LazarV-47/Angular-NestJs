import { createAction, props } from '@ngrx/store';
import { Review } from './reviews.model';

export const loadReview = createAction(
    '[Reviews] Load Reviews',
     props<{ gameId: number }>()
    );

export const loadReviewSuccess = createAction(
    '[Reviews] Load Review Success',
     props<{ review: Review }>()
    );

export const loadReviewFailure = createAction(
    '[Reviews] Load Review Failure',
     props<{ error: string }>()
    );



export const addReview = createAction(
    '[Reviews] Add Review',
    props<{ review: { gameId: number; rating: number; comment: string } }>()
    );

export const addReviewSuccess = createAction(
    '[Reviews] Add Review Success',
    props<{ review: Review }>()
    );

export const addReviewFailure = createAction(
    '[Reviews] Add Review Failure',
    props<{ error: string }>()
    );


    
export const editReview = createAction(
    '[Reviews] Edit Review',
    props<{ review: Review }>()
    );

export const editReviewSuccess = createAction(
    '[Reviews] Edit Review Success',
    props<{ review: Review }>()
    );

export const editReviewFailure = createAction(
    '[Reviews] Edit Review Failure',
    props<{ error: string }>()
    );

    

export const deleteReview = createAction(
    '[Reviews] Delete Review',
    props<{ id: number }>()
    );

export const deleteReviewSuccess = createAction(
    '[Reviews] Delete Review Success',
    props<{ id: number, gameId: number }>()
    );

export const deleteReviewFailure = createAction(
    '[Reviews] Delete Review Failure',
    props<{ error: string }>()
    );

export const updateGameReview = createAction(
    '[Games] Update Game Review',
    props<{ gameId: number; review: Review | undefined }>()
    );