import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './movies/Movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  selectedMovie:Movie = {} as Movie;

  constructor() { }


  updateMovie(movie: Movie) {
    this.selectedMovie = movie;
    
    
  }
}
