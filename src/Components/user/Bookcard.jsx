import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './Bookcard.css'; // Import the external CSS file

const BookCard = ({ book }) => {
  const [showCarousel, setShowCarousel] = useState(false);

  const handlePreviewClick = () => {
    setShowCarousel(true);
  };

  const handleCloseCarousel = () => {
    setShowCarousel(false);
  };

  return (
    <Card className="book-card">
      <img src={`data:${book.coverImageURL.contentType};base64,${book.coverImageURL.data}`} alt="Book Cover" className="book-cover" />
      <CardContent>
        <Typography variant="h5" className="book-title">
          {book.title}
        </Typography>
        <Typography variant="body2" className="book-details">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" className="book-details">
          Genre: {book.genre}
        </Typography>
        <Typography variant="body2" className="book-details">
          ISBN: {book.ISBN}
        </Typography>
        <Typography variant="body2" className="book-details">
          Language: {book.language}
        </Typography>
        <Typography variant="body2" className="book-details">
          Publisher: {book.publisher}
        </Typography>
        <Typography variant="body2" className="book-details">
          Publication Date: {book.publicationDate}
        </Typography>
        <Typography variant="body2" className="book-description">
          Description: {book.description}
        </Typography>
        <div className="button-group">
          <Link to={`/download/${book._id}`} className="download-link">
            <Button variant="contained" color="primary">
              Download Now
            </Button>
          </Link>
          <Button variant="outlined" color="primary" onClick={handlePreviewClick}>
            Preview
          </Button>
        </div>
      </CardContent>
      <Modal show={showCarousel} onHide={handleCloseCarousel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            <Carousel.Item>
              <img src={`data:${book.coverImageURL.contentType};base64,${book.coverImageURL.data}`} alt="Book Cover" className="preview-image" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={`data:${book.freeview1Url.contentType};base64,${book.freeview1Url.data}`} alt="Free View Image 1" className="preview-image" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={`data:${book.freeview2Url.contentType};base64,${book.freeview2Url.data}`} alt="Free View Image 2" className="preview-image" />
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default BookCard;
