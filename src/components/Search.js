import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';
import { uniqBy } from 'lodash';

class Search extends Component {
  static propTypes = {
      booksOnShelf: PropTypes.arrayOf(PropTypes.object).isRequired,
    moveBook: PropTypes.func.isRequired,
  };

  static defaultProps = {
      booksOnShelf: [],
  };

  state = {
    query: '',
    foundBooks: [],
  };
    /**
     * @description Based on search query to search books
     * @param {string} query
     */
  updateQuery = query => {
    if (query.trim().length === 0) {
      this.setState({ foundBooks: [] });
    }

    const result = BooksAPI.search(query.trim(), 20)
      .then(res => {
        this.setState(() => ({
          foundBooks: Array.isArray(res)
            ? uniqBy(res, 'id').map(book => ({
                ...book,
                shelf: 'none',
              }))
            : [],
            
        }));
      })
      .catch(() => this.setState({ foundBooks: [] }));

      this.setState({foundBooks: result});
  };

  render() {
    const callBook = book =>
      <Book
        key={book.id}
        {...book}
        moveShelf={shelf => this.props.moveBook(book, shelf)}
      />;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.updateQuery.query}
              onChange={e => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.foundBooks.map(callBook)}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
