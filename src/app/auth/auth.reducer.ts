import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './user.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { AuthState } from './auth.state';


export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.userId, // Use 'userId' as the unique identifier
  sortComparer: false
});

// export interface AuthState {
//   token: string | null;
//   error: string | null;
//   isAuthenticated: boolean;
//   user: User | null;
// }

export const initialState: AuthState = adapter.getInitialState({
  token: null,
  error: null,
  isAuthenticated: false,
});

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, user }) => {
    // console.log('Reducer: loginSuccess', token); // Log here
    return adapter.setOne(user, {
      ...state,
      token,
      isAuthenticated: true,
      error: null
    });
  }),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.logout, (state) => {
    return adapter.removeAll({
      ...state,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  }),
  on(AuthActions.registerSuccess, (state, { token, user }) => {
    return adapter.setOne(user, {
      ...state,
      token,
      isAuthenticated: true,
      error: null,
    });
  }),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // on(AuthActions.setUser, (state, { user }) => ({
  //   ...state,
  //   user,
  // })),
  // on(AuthActions.clearUser, (state) => ({
  //   ...state,
  //   user: null,
  // })),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
