import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectGameById } from '../../store/games/games.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Game } from '../../store/games/games.model';
import { updateGame } from '../../store/games/games.actions';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    NavbarComponent,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './game-update.component.html',
  styleUrl: './game-update.component.scss'
})
export class GameUpdateComponent {
  gameForm: FormGroup;
  gameId: string | null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {
    this.gameId = this.route.snapshot.paramMap.get('id');


    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      status: ['', Validators.required],
      description: ['']
    });

    this.loadGameDetails();
  }

  loadGameDetails() {
    if (this.gameId){
      this.store.select(selectGameById(parseInt(this.gameId))).subscribe((game) => {
        if (game) {
          this.gameForm.patchValue({
            title: game.title,
            genre: game.genre,
            description: game.description
          });
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.gameForm.valid) {
      const updatedGame: Game = {
        id: this.gameId,
        ...this.gameForm.value,
      };

      if (this.selectedFile) {
        updatedGame.picture = this.selectedFile;
    }

      this.store.dispatch(updateGame({ game: updatedGame }));

      this.router.navigate(['/game-detail', this.gameId]);
    }
  }
}
