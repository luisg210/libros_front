import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { HomeComponent } from './components/home/home.component';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  declarations: [
    AddBookComponent,
    ListBookComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BookRoutingModule
  ]
})
export class BookModule { }
