import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditGenre({ genreId }) {
  const [genreDetails, setGenreDetails] = useState({
    genre: '',
    // Add more fields if needed
  });

  useEffect(() => {
    // Fetch genre details by ID when the component mounts
    const fetchGenreDetails = async () => {
      try {
        const response = await axios.post('http://localhost:3005/api/genres/getgenrebyid', {
            genreId,
          });

        setGenreDetails(response.data);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    fetchGenreDetails();
  }, [genreId]); // Trigger the effect when genreId changes

  const handleInputChange = (e) => {
    setGenreDetails({
      ...genreDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateGenre = async () => {
    try {
        await axios.put('http://localhost:3005/api/genres/updategenre', {
            genreId,
            ...genreDetails,
          });

      alert("updated")
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <h2>Edit Genre</h2>
      <form>
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={genreDetails.genre}
          onChange={handleInputChange}
        />

        
        
        <button type="button" onClick={handleUpdateGenre}>
          Update Genre
        </button>
      </form>
    </div>
  );
}

export default EditGenre;
