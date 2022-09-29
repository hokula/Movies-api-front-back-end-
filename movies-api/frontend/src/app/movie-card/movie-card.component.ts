import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../movies/Movie.model';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie = <Movie>{};
  @Output() onDelete = new EventEmitter();
  @Output() onUpdate = new EventEmitter();

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  deleteMovie(id: number) {
    this.onDelete.emit(id);
  }
  updateMovie(movie: Movie) {
    this.onUpdate.emit(movie);
  }
}
