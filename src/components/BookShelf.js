import React from 'react';
import PropTypes from 'prop-types';

const BookShelf = ({ title, children }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {React.Children.map(children, (child, i) =>
            <li>
              {child}
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BookShelf;
