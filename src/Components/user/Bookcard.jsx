// BookCard.js

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const BookCard = ({ book }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 345, marginBottom: '10px' ,marginLeft:'30px' }}>
      <CardMedia
        component="img"
        height="140"
        image={`data:${book.coverImageURL.contentType};base64,${book.coverImageURL.data}`}
        alt="Book Cover"
      />
      <CardContent sx={{ flex: '1 0 auto', overflow: 'auto', maxHeight: '200px' }}>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ISBN: {book.ISBN}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genre: {book.genre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Publication Date: {book.publicationDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Language: {book.language}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Publisher: {book.publisher}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {book.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
