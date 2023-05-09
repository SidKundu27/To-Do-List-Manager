import React, { useState } from 'react';
import Goodreads from 'goodreads-api-node';

const BookRecommender = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleInputChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const goodreads = new Goodreads({
      key: '<your_api_key>',
      secret: '<your_api_secret>',
    });
    goodreads.searchBooks({ q: bookTitle }).then((results) => {
      const bookId = results.search.results.work[0].best_book.id._text;
      goodreads.showBook(bookId).then((book) => {
        const genre = book.book.popular_shelves.shelf[0].$.name;
        setGenre(genre);
        goodreads.listByGenre(genre, { per_page: 5 }).then((books) => {
          const recommendations = books.books.book.map((book) => book.title);
          setRecommendations(recommendations);
        });
      });
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="bookTitle">Enter a book title:</label>
        <input
          id="bookTitle"
          type="text"
          value={bookTitle}
          onChange={handleInputChange}
        />
        <button type="submit">Find Recommendations</button>
      </form>
      {genre && (
        <div>
          <h2>Genre: {genre}</h2>
          <ul>
            {recommendations.map((bookTitle) => (
              <li key={bookTitle}>{bookTitle}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookRecommender;