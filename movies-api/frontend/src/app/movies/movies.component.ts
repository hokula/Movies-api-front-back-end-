import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-service.service';
import { Movie } from './Movie.model';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private router: Router, private api: ApiService) {

  }

  @Input() title: string = '';
  query: string = '';
  @Input() movies: Movie[] = [];

  ngOnInit(): void {
    console.log('Ovo je init poziv');
    this.fetchMovies();
  };
  fetchMovies() {
    this.api.fetchMovies().subscribe((response: Movie[]) => {
      this.movies = response;
    });
  };
  searchMovies() {
    if (this.query === '') {
      return this.fetchMovies();
    }
    const URL = `${environment.serverUrl}movies/search/${this.query}`;
    this.api.searchMovies(this.query).subscribe((response: Movie[]) => {
      this.movies = response
    })
  }
  deleteMovie(id: number) {
    this.api.deleteMovie(id).subscribe((response: any) => {
      const index = this.movies.findIndex((movie: Movie) =>
        movie.film_id === id);
      this.movies.splice(index, 1);
      this.toastr.success(response.message);

    });
  }
  gotoDetails(movie: Movie) {
    this.router.navigate(['details', movie.film_id]);
  }
};