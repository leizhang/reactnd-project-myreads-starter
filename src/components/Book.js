import React from 'react';
import PropTypes from 'prop-types';

const Book = ({
  id,
  title,
  bookshelf,
  authors = [],
  imageLinks = {},
  moveShelf,
}) =>
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${imageLinks.smallThumbnail}")`,
        }}
      />
      <div className="book-shelf-changer">
        <select value={bookshelf} onChange={e => moveShelf(e.target.value)}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">
      {title}
    </div>
    <div className="book-authors">
      {authors.join(', ')}
    </div>
  </div>;

Book.propTypes = {
  title: PropTypes.string.isRequired,
  bookshelf: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string.isRequired,
  }),
  moveShelf: PropTypes.func.isRequired,
};

export default Book;
