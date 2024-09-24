import { createAction, props } from '@ngrx/store';
import { User } from './user.model';
import { LoginDTO } from './auth-dto/login.dto';
import { RegisterDTO } from './auth-dto/register.dto';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginDTO }>()
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
  props<{ credentials: RegisterDTO }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ token: string, user: User }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// export const setUser = createAction(
//   '[Auth] Set User',
//   props<{ user: User }>()
// );

// export const clearUser = createAction(
//   '[Auth] Clear User'
// );

