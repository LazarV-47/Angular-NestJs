import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Game } from '../../store/games/games.model';
import { MatCardModule }  from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { environment } from '../../../environments/environments';
import { Store } from '@ngrx/store';
import { deleteGame as deleteGameAction } from '../../store/games/games.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-single-game',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NavbarComponent,
    MatButtonModule,
    MatIcon
],
  templateUrl: './single-game.component.html',
  styleUrl: './single-game.component.scss'
})
export class SingleGameComponent{
  @Input() game!: Game;
  backendUrl = environment.backendUrl;

  constructor(private store: Store) { }


  deleteGame(event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(deleteGameAction({ id: this.game.id }));
  }
}
