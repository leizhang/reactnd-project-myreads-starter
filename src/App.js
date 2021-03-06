import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookList from './components/BookList';
import Search from './components/Search';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState({
        books: this.state.books.filter(b => book.id !== b.id).concat(book),
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <BookList books={this.state.books} moveBook={this.moveBook} />}
        />
        <Route
          exact
          path="/search"
          render={() =>
            <Search booksOnShelf={this.state.books} moveBook={this.moveBook} />}
        />
      </div>
    );
  }
}

export default BooksApp;
