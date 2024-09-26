import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { NewGameFormComponent } from './games/new-game-form/new-game-form.component';
import { AuthGuard } from './auth/auth.guard';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameUpdateComponent } from './games/game-update/game-update.component';
import { NewReviewFormComponent } from './review/new-review-form/new-review-form.component';
import { ReviewUpdateComponent } from './review/review-update/review-update.component';
import { LikedGameListComponent } from './games/liked-game-list/liked-game-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'game-list', component: GameListComponent, },
  { path: 'new-game', component: NewGameFormComponent, canActivate: [AuthGuard] },
  { path: 'game-detail/:id', component: GameDetailComponent },
  { path: 'edit-game/:id', component: GameUpdateComponent, canActivate: [AuthGuard] },
  { path: 'add-review/:gameId', component: NewReviewFormComponent },
  { path: 'edit-review/:reviewId', component: ReviewUpdateComponent },
  { path: 'liked-games', component: LikedGameListComponent },
  { path: '**', redirectTo: 'login' },
];
