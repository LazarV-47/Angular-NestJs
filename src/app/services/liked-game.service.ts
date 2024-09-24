import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LikedGame } from "../store/liked-game/liked-game.model";

@Injectable({
    providedIn: 'root'
  })
  export class LikedGameService {
    private backendUrl = environment.backendUrl;
  
    constructor(private http: HttpClient) {}
  
    // Get the list of liked games for the current user
    getLikedGames(): Observable<LikedGame[]> {
      return this.http.get<LikedGame[]>(`${this.backendUrl}/liked-game`);
    }
  
    // Add a game to the liked list
    addLikedGame(gameId: number, status: string): Observable<LikedGame> {
      return this.http.post<LikedGame>(`${this.backendUrl}/liked-game/add/${gameId}`, {status});
    }

    unlikeGame(gameId: number): Observable<{ likedGameId: number }> {
      return this.http.delete<{ likedGameId: number }>(`${this.backendUrl}/liked-game/unlike/${gameId}`);
    }

  }