import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'books', component: ListBookComponent },
    { path: 'add', component: AddBookComponent },
    { path: 'edit/:id', component: AddBookComponent },
    { path: '**', redirectTo: 'home' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
