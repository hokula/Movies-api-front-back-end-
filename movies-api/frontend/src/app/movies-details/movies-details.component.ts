import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Movie } from '../movies/Movie.model';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit {

  movie: Movie = {} as Movie;
  constructor(private httpClient: HttpClient,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

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
  gotoUpdate(id: number) {
    this.router.navigate(['edit',id])
  }

}
