import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  books?: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAllBooks()
    .subscribe({
      next: (data) => {
        this.books = data;
        
      }, error: (e) => {
        console.log(e);
        
      }
    })
  }

  changeState(id:any): void {
      Swal.fire({
        title: 'Cambio de estado',
        text: '¿Desea cambiar el estado del libro, el libro ya no se mostrará en la lista?',
        icon: 'success',
        confirmButtonText: 'Sí',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
          this.bookService.changeStateBook(id)
          .subscribe({
            next: () => {
              this.getBooks();

              Swal.fire({
                title: 'Éxito',
                text: 'Cambio el estado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              
            }, error: (e) => {
              console.log(e);
              
            }
          });
        }
      });
  }
}
