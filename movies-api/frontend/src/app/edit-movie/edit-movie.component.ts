import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Movie } from '../movies/Movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {
  movie: Movie = {} as Movie;
  constructor(private activeRoute: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    const id = Number(this.activeRoute.snapshot.params['id']);
    this.getMovieById(id);
  }
  getMovieById(id: number) {
    const URL = `${environment.serverUrl}movies/all`;
    this.httpClient.get<Movie[]>(URL, { params: { id } }).subscribe((response: Movie[]) => {
      this.movie = response[0];
      console.log(this.movie);

    });
  }
}
