import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../store/games/games.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'http://localhost:3000/game';  // Adjust this to your actual backend URL

  constructor(private http: HttpClient) {}

  addGame(game: Partial<Game>): Observable<Game> {
    const formData = new FormData();
    formData.append('title', game.title || '');
    formData.append('genre', game.genre || '');
    formData.append('description', game.description || '');
    formData.append('status', game.status || 'want to play');
    if (game.picture) {
      formData.append('picture', game.picture);
    }
    return this.http.post<Game>(`${this.apiUrl}/createGame`, formData);
  }

  
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/findAllGames`);
  }


  updateGame(id: number, gameData: FormData) {
    console.log("update service called");
    return this.http.patch<Game>(`${this.apiUrl}/updateGame/${id}`, gameData);
  }


  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteGame/${id}`);
  }

}