import { Author } from "./author.model";
import { Category } from "./category.model";

export class Book {

    id?: number;
    nombre?: string;
    author?: Author
    category?: Category
    precio?: number;
    estado?: string;

}
