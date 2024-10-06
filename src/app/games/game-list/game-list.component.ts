import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadGames } from '../../store/games/games.actions';
import { selectAllGames, selectFilteredGames, selectGamesError, selectGamesLoading } from '../../store/games/games.selectors';
import { SingleGameComponent } from '../single-game/single-game.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Game } from '../../store/games/games.model';
import { NavbarComponent } from "../../navbar/navbar.component";
import { environment } from '../../../environments/environments';
import { GamesState } from '../../store/games/games.state';
import { selectAuthToken } from '../../auth/auth.selectors';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../auth/user.model';
import { loadLikedGames } from '../../store/liked-game/liked-game.actions';
import { Review } from '../../store/reviews/reviews.model';
import { selectAllReviews } from '../../store/reviews/review.selectors';
import { loadAllReviews } from '../../store/reviews/reviews.actions';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    CommonModule,
    SingleGameComponent,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinner,
    MatError,
    RouterModule,
    NavbarComponent
],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent implements OnInit{
  games$: Observable<Game[]>;
  filteredGames$: Observable<Game[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  searchTerm$ = new BehaviorSubject<string>('');
  
  //reviews$: Observable<Review[]>;

  backendUrl = environment.backendUrl;
  role: string | null = '';

  constructor(private store: Store<GamesState>) {
    this.games$ = this.store.select(selectAllGames);
    this.filteredGames$ = combineLatest([
      this.games$, 
      this.searchTerm$
    ]).pipe(
      map(([games, searchTerm]) => games.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
    this.loading$ = this.store.select(selectGamesLoading);
    this.error$ = this.store.select(selectGamesError);
    
    this.store.dispatch(loadGames());

    //this.reviews$ = this.store.select(selectAllReviews);
    //this.store.dispatch(loadAllReviews());

    this.store.select(selectAuthToken).subscribe(token => {
      if (token) {
        const decodedToken: User = jwtDecode(token);
        this.role = decodedToken.role;
      }
    });
  }


  ngOnInit(): void {
    //console.log("Dispatching loadLikedGames action in parent");
    this.store.dispatch(loadLikedGames());
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  onSearchTermChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm$.next(input.value); 
  }
}
