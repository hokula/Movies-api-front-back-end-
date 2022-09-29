import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './movies/Movie.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  searchMovies(query: string) {
    const URL = `${environment.serverUrl}movies/search/${query}`;
    return this.httpClient.get<Movie[]>(URL);
  }
  fetchMovies() {
    const URL = `${environment.serverUrl}movies/all`;
    return this.httpClient.get<Movie[]>(URL)
  }
  deleteMovie(id: number) {
    const url = `${environment.serverUrl}movie/${id}`;
    return this.httpClient.delete(url)
  }
}
