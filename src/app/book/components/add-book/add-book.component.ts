import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/book/models/author.model';
import { Book } from 'src/app/book/models/book.model';
import { Category } from 'src/app/book/models/category.model';
import { AuthorService } from 'src/app/book/services/author.service';
import { BookService } from 'src/app/book/services/book.service';
import { CategoryService } from 'src/app/book/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  id?: number;
  authors?: Author[];
  categories?: Category[];
  form = this.fb.group({
    nombre: ['', [Validators.required]],
    precio: ['', [Validators.pattern('^([-+,0-9.]+)'), Validators.required]],
    categoria: ['', [Validators.required]],
    autor: ['', [Validators.required]],
  });
  book = new Book;

  constructor(private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private authorService: AuthorService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAuthors();
    this.getCategories();
    
    this.getBook();
  }

  getAuthors(): void {
    this.authorService.getAllAuthors()
    .subscribe({
      next: (data) => {
        this.authors = data;
        
      }, error: (e) => {
        console.log(e);
      }
    })
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
    .subscribe({
      next: (data) => {
        this.categories = data;
        
      }, error: (e) => {
        console.log(e);
        
      }
    })
  }

  submit(): void {
    let author = new Author;
    let category = new Author;
    author.id = this.form.value.autor;
    category.id = this.form.value.categoria;

    this.book.author = author;
    this.book.category = category;
    this.book.estado = 'd';
    this.book.nombre = this.form.value.nombre;
    this.book.precio = this.form.value.precio;    

    if (this.id) {
      this.bookService.updateBook(this.book, this.id)
      .subscribe({
        next: () => { 
          Swal.fire({
            title: 'Éxito',
            text: 'Actualizado con éxito',
            icon: 'success', 
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/book/books');
            }
          });


        }, error: (e) => {
          console.log(e);
        }
      })

    } else {
      this.bookService.createBook(this.book)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Éxito',
            text: 'Guardado con éxito',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/book/books');
            }
          });

        }, error: (e) => {
          console.log(e);
        }
      })
    }
  }

  getBook(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.bookService.getBookById(this.id)
      .subscribe({
        next: (data) => {
          this.book = data;
          this.form.reset({
            nombre: this.book.nombre,
            precio: this.book.precio,
            categoria: this.book.category?.id,
            autor: this.book.author?.id,
          })
          
        }, error: (e) => {
          console.log(e);
          
        }
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}
