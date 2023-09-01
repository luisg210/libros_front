import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

const BASE_URL = 'http://localhost:8080/api/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${BASE_URL}/`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${BASE_URL}/`, book);
  }

  updateBook(book: Book, id: number): Observable<Book> {
    return this.http.put<Book>(`${BASE_URL}/${id}`, book);
  }

  changeStateBook(id: number): Observable<any> {
    return this.http.patch<any>(`${BASE_URL}/${id}`, null);
  }

  delateBook(book: Book, id: number): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/${id}`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${BASE_URL}/${id}`);
  }
}
