import { createSelector } from '@ngrx/store';
import { Author } from '../author';
import { getAuthorsOfBook, getBook, getTagsOfBook } from '../book';
import { Tag } from '../tag';

export class BookView {
  title: string;
  description: string;
  authors: Author[];
  tags: Tag[];
  published: number;
}

export const getBookView = createSelector(
  getBook,
  getAuthorsOfBook,
  getTagsOfBook,
  (book, authors, tags): BookView =>
    book && {
      title: book.title,
      description: book.description,
      published: book.published,
      authors,
      tags
    }
);
