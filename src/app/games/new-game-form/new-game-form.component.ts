import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Game } from '../../store/games/games.model';
import { addGame } from '../../store/games/games.actions';
import { MatCardModule }  from '@angular/material/card';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatSelectModule }  from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Review } from '../../store/reviews/reviews.model';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MatInputModule } from '@angular/material/input';
import { ReviewTempService } from '../../services/review-temp.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-new-game-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
],
  templateUrl: './new-game-form.component.html',
  styleUrl: './new-game-form.component.scss'
})
export class NewGameFormComponent {
  gameForm: FormGroup;
  selectedFile: File | undefined = undefined;

  constructor(private fb: FormBuilder, private store: Store) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      status: ['want to play', Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      }
    }


  addGame() {
    if (this.gameForm.valid) {
      const game: Game = this.gameForm.value;
      game.picture = this.selectedFile;
      this.store.dispatch(addGame({ game }));
    }
  }

}

