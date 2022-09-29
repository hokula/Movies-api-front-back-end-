import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movies/Movie.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  @Input() movie: Movie = {} as Movie;
  rating: string[] = ['G', 'PG', 'PG-13', 'R', 'NC-17'];


  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  cancelMovie() {
    this.movie = {} as Movie;
  }
  saveMovie() {
    this.movie.film_id ?  this.updateMovie(): this.insertMovie();
  }
  insertMovie() {
    const URL = `${environment.serverUrl}movie`
    this.httpClient.post<Movie>(URL, this.movie).subscribe((response: any) => {
      this.cancelMovie();
      this.toastr.success(response.message);
    })
  }
  updateMovie() {
    console.log(this.movie);
    const URL = `${environment.serverUrl}movie`
    this.httpClient.put<Movie>(URL, this.movie).subscribe((response: any) => {
      this.cancelMovie();
      this.toastr.success(response.message);

    })
  }
}
