import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReviewsEffects } from './store/reviews/reviews.effects';
import { AuthEffects } from './auth/auth.effects';
import { GamesEffects } from './store/games/games.effects';
import { authReducer } from './auth/auth.reducer';
import { gamesReducer } from './store/games/games.reducers';
import { reviewsReducer } from './store/reviews/review.reducers';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { GameService } from './services/game.service';
import { ReviewService } from './services/review.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LikedGameService } from './services/liked-game.service';
import { likedGameReducer } from './store/liked-game/liked-game.reducer';
import { LikedGameEffects } from './store/liked-game/liked-games.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    importProvidersFrom(AppRoutingModule),
    AuthService, 
    GameService,
    ReviewService,
    LikedGameService,
    provideStore({
      auth: authReducer,
      games: gamesReducer,
      reviews: reviewsReducer,
      likedGames: likedGameReducer
    }), 
    provideEffects([AuthEffects, GamesEffects, ReviewsEffects, LikedGameEffects]), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), 
    provideAnimationsAsync(),    
    ],
};
