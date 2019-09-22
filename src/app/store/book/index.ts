import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  createSelectorFactory,
  defaultMemoize,
  on,
  props
} from '@ngrx/store';
import { Author, getAuthorEntities } from '../author';
import { getTagEntities, Tag } from '../tag';
import { Book } from './book.model';

export * from './book.model';

export const upsertBook = createAction(
  '[Book] Update',
  props<{ book: Book }>()
);
export interface BookState extends EntityState<Book> {}

const bookAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

const initialBookState: BookState = bookAdapter.getInitialState();

export const bookReducer = createReducer(
  initialBookState,
  on(upsertBook, (state, action) => bookAdapter.upsertOne(action.book, state))
);

export const getBookState = createFeatureSelector<BookState>('book');

export const { selectEntities: getBookEntities } = bookAdapter.getSelectors(
  getBookState
);

export const getBook = createSelector(
  getBookEntities,
  (books, bookId: string): Book => books[bookId]
);

export const checkEqual = (a, b) =>
  a && b && a.length === b.length && a.every((val, idx) => val === b[idx]);

export const getAuthorsOfBook = () =>
  createSelectorFactory(projector =>
    defaultMemoize(projector, undefined, checkEqual)
  )(getBook, getAuthorEntities, (book, authors): Author[] =>
    book ? book.authorIds.map(authorId => authors[authorId]) : []
  );

export const getTagsOfBook = () =>
  createSelectorFactory(projector =>
    defaultMemoize(projector, undefined, checkEqual)
  )(getBook, getTagEntities, (book, tags): Tag[] =>
    book ? book.tagIds.map(tagId => tags[tagId]) : []
  );
