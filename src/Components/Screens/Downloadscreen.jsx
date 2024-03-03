import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DownloadScreen.css';

const DownloadScreen = () => {
  const [book, setBook] = useState(null);
  const [coverImageSrc, setCoverImageSrc] = useState('');
  const { bookid } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/books/getbookbyid/${bookid}`);
        const bookData = response.data;
        const coverImageData = `data:${bookData.coverImageURL.contentType};base64,${bookData.coverImageURL.data}`;
        setBook({ ...bookData, coverImageURL: coverImageData });
        setCoverImageSrc(coverImageData);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookid]);

  const handleDownload = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('currentuser'))._id;
  
      const requestData = {
        userId,
        bookId: book._id,
        title: book.title,
        author: book.author,
        ISBN: book.ISBN,
        genre: book.genre,
        publicationDate: book.publicationDate,
        language: book.language,
        publisher: book.publisher,
        description: book.description,
        coverImage: coverImageSrc // Pass the cover image URL directly
      };
  
      const result = await axios.post('http://localhost:3005/api/download/add', requestData);
  
      alert("Success");
      console.log('Download successful:', result.data);
    } catch (error) {
      console.error('Error downloading:', error);
      alert("Something went wrong");
    }
  };
  
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Full-width container for the div */}
        <div className="col-md-12">
          {/* Single div for image on left and details on right */}
          <div className="d-flex shadow p-3 mb-5 bg-body rounded">
            {/* Left part for cover image */}
            <div className="flex-grow-1">
              <h2>{book.title}</h2>
              <div className="image-container">
                <img
                  src={coverImageSrc}
                  alt="Book Cover"
                  className="cover-image"
                />
              </div>
            </div>
            {/* Right part for book details */}
            <div className="flex-grow-1 text-end">
              <h2>Book Details</h2>
              <p><strong>Title:</strong> {book.title}</p>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Publication Date:</strong> {book.publicationDate}</p>
              <p><strong>Language:</strong> {book.language}</p>
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>Description:</strong> {book.description}</p>
              <div className="download-button-container">
                <button className="btn btn-primary" onClick={handleDownload}>
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadScreen;
