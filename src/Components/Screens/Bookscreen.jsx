import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/books/getallbooks`);
        const bookData = response.data;
        setBook(bookData);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>Author: {book.author}</h2>
      <img src={`data:${book.coverImageURL.contentType};base64,${book.coverImageURL.data}`} alt="Book Cover" className="book-cover" />
      {book.freeview1Url && (
        <img src={`data:${book.freeview1Url.contentType};base64,${book.freeview1Url.data}`} alt="Free View Image 1" />
      )}
      {book.freeview2Url && (
        <img src={`data:${book.freeview2Url.contentType};base64,${book.freeview2Url.data}`} alt="Free View Image 2" />
      )}
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetails;
