import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'antd'; // Assuming you have Ant Design components
import EditGenre from '../Screens/Editgenre'; // Adjust the import path based on your project structure
import './Genretable.css'; // Import your CSS file for GenreTable styling

function GenreTable() {
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/genres');
      setGenres(response.data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditGenre = (genreId) => {
    setVisible(true);
    setSelectedGenreId(genreId);
  };

  const handleModalCancel = () => {
    setVisible(false);
    setSelectedGenreId('');
  };

  const handleActivateGenre = async (genreId) => {
    try {
      setLoader(true);
      await axios.put(`http://localhost:3005/api/genres/activate/${genreId}`, { display: true });
      fetchData();
      setLoader(false);
      alert("activated")
    } catch (error) {
      console.error(error);
      setLoader(false);
      // Show error message
    }
  };

  const handleDeactivateGenre = async (genreId) => {
    try {
      setLoader(true);
      await axios.put(`http://localhost:3005/api/genres/deactivate/${genreId}`, { display: false });
      fetchData();
      setLoader(false);
      alert("deactivated")
    } catch (error) {
      console.error(error);
      setLoader(false);
      // Show error message
    }
  };

  return (
    <div className="genre-table-container"> {/* Apply CSS class for GenreTable container */}
      <h2>Genre Table</h2>
      {/* {loader && <Loader />} */}
      <table className="genre-table"> {/* Apply CSS class for GenreTable */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre._id}>
              <td>{genre._id}</td>
              <td>{genre.genre}</td>
              <td>
                {genre.display ? (
                  <button onClick={() => handleDeactivateGenre(genre._id)}>Deactivate</button>
                ) : (
                  <button onClick={() => handleActivateGenre(genre._id)}>Activate</button>
                )}
              </td>
              <td>
                <button className='edit-button' onClick={() => handleEditGenre(genre._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EditGenre Modal */}
      <Modal
        title='Edit Genre'
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <EditGenre genreId={selectedGenreId} />
      </Modal>
    </div>
  );
}

export default GenreTable;
