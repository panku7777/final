import React, { useState } from 'react';
import axios from 'axios';
import './Addgenre.css'; // Import the external CSS file

function AddGenreForm() {
  const [genre, setGenre] = useState('');

  async function addGenre() {
    try {
      // Validate genre
      if (!genre.trim()) {
        alert('Please enter a valid genre.');
        return;
      }

      const newGenre = {
        genre: genre.trim(),
        display: true, // Set display to be true when adding a new genre
      };

      const response = await axios.post('http://localhost:3005/api/genres/add', newGenre);
      console.log(response.data);

      // Handle success if needed
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  }

  return (
    <div className="form-container">
      <label htmlFor="genre">Genre:</label><br/>
      <div className="input-button-container">
        <input
          type="text"
          className="input-field"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button className="button" onClick={addGenre}>
          Add Genre
        </button>
      </div>
    </div>
  );
}

export default AddGenreForm;
