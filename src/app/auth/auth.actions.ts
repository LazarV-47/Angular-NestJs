import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string, user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const register = createAction(
  '[Auth] Register',
  props<{ username: string; email: string; password: string; picture: File | null }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ token: string, user: User }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: User }>()
);

export const clearUser = createAction('[Auth] Clear User');

