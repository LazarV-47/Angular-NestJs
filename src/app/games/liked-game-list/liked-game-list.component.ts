import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SingleGameComponent } from '../single-game/single-game.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Game } from '../../store/games/games.model';
import { Store } from '@ngrx/store';
import { selectAllLikedGames, selectLikedGamesError, selectLikedGamesLoading } from '../../store/liked-game/liked-game.selectors';
import { loadLikedGames } from '../../store/liked-game/liked-game.actions';
import { LikedGame } from '../../store/liked-game/liked-game.model';
import { SingleLikedGameComponent } from "../single-liked-game/single-liked-game.component";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-liked-game-list',
  standalone: true,
  imports: [
    CommonModule,
    SingleGameComponent,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinner,
    MatError,
    MatSelectModule,
    RouterModule,
    NavbarComponent,
    FormsModule,
    SingleLikedGameComponent
],
  templateUrl: './liked-game-list.component.html',
  styleUrl: './liked-game-list.component.scss'
})
export class LikedGameListComponent implements OnInit {
  likedGames$: Observable<LikedGame[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  filteredGames$: Observable<LikedGame[]>;
  searchTerm$ = new BehaviorSubject<string>('');
  status$ = new BehaviorSubject<string>('');

  constructor(private store: Store) {
    this.likedGames$ = this.store.select(selectAllLikedGames);
    this.filteredGames$ = combineLatest([
      this.likedGames$,
      this.searchTerm$,
      this.status$,
    ]).pipe(
      map(([likedGames, searchTerm, status]) => {
        return likedGames.filter(likedGame =>
          likedGame.game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (status === '' || likedGame.status === status)
        );
      })
    );
    this.loading$ = this.store.select(selectLikedGamesLoading);
    this.error$ = this.store.select(selectLikedGamesError);

    this.store.dispatch(loadLikedGames());
  }

  ngOnInit(): void {
    this.store.dispatch(loadLikedGames());
  }

  onSearchTermChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm$.next(input.value);  // Update the BehaviorSubject when the input changes
  }

  onStatusChanged(event: any): void {
    this.status$.next(event.value);  // Trigger status change filtering
  }
}