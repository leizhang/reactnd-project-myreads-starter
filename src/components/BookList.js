import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import Book from './Book';

const BookList = ({ books, moveBook }) => {
  const callBook = book =>
    <Book key={book.id} {...book} moveShelf={shelf => moveBook(book, shelf)} />;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf title="Currently Reading">
          {books
            .filter(({ shelf }) => shelf === 'currentlyReading')
            .map(callBook)}
        </BookShelf>
        <BookShelf title="Want to Read">
          {books.filter(({ shelf }) => shelf === 'wantToRead').map(callBook)}
        </BookShelf>
        <BookShelf title="Read">
          {books.filter(({ shelf }) => shelf === 'read').map(callBook)}
        </BookShelf>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  moveBook: PropTypes.func.isRequired,
};

export default BookList;
