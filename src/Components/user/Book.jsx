// BookList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './Bookcard'; // Assuming BookCard component is in the same directory

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3005/api/books/getallbooks');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch books');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {books.map((book, index) => (
             book.display && <BookCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;