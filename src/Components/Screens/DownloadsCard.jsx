import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './DownloadCard.css'; // Import external CSS file

const DownloadCard = ({ download }) => {
  return (
    <Card className="download-card">
      <CardMedia
        component="img"
        className="card-image" // Apply class for image
        image={download.coverImageUrl}
        alt="Book Cover"
      />
      <CardContent className="card-content"> {/* Apply class for content */}
        <Typography gutterBottom variant="h5" component="div">
          {download.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {download.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genre: {download.genre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ISBN: {download.ISBN}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Language: {download.language}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Publisher: {download.publisher}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Publication Date: {download.publicationDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {download.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DownloadCard;
