import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {path:'home', component:MoviesComponent},
  {path:'create', component: MovieFormComponent},
  {path:'details/:id', component: MoviesDetailsComponent},
  {path:'edit/:id', component: EditMovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
