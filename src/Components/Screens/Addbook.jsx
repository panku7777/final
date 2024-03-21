// Addbook.js

import React, { useState, useEffect } from 'react';
import './Addroom.css'; // Import the external CSS file
import axios from 'axios';

function Addbook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [ISBN, setISBN] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]); // State to store the available genres
  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState([]); // State to store the available languages
  const [publicationDate, setPublicationDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [description, setDescription] = useState('');
  const [display, setDisplay] = useState(true);
  
  // States for image files
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [freeview1File, setFreeview1File] = useState(null);
  const [freeview2File, setFreeview2File] = useState(null);

  useEffect(() => {
    // Fetch genres from your API endpoint
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/genres');
        setGenres(response.data); // Assuming the response is an array of genres
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    // Fetch languages from your API endpoint
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/languages');
        setLanguages(response.data); // Assuming the response is an array of languages
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    fetchGenres();
    fetchLanguages();
  }, []); // Run this effect once when the component mounts

  async function addBook() {
    const newBook = {
      title,
      author,
      ISBN,
      genre,
      publicationDate,
      language,
      publisher,
      description,
      display: true, 
    };
    

    // Append image files to the form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('ISBN', ISBN);
    formData.append('genre', genre);
    formData.append('publicationDate', publicationDate);
    formData.append('language', language);
    formData.append('publisher', publisher);
    formData.append('description', description);
    formData.append('display', display);
    

    if (coverImageFile) {
      formData.append('coverImageURL', coverImageFile);
    }
    if (freeview1File) {
      formData.append('freeview1Url', freeview1File);
    }
    if (freeview2File) {
      formData.append('freeview2Url', freeview2File);
    }

    try {
      const response = await axios.post('http://localhost:3005/api/books/addbook', formData);
      console.log(response.data);
      alert("book added")
      // Handle success if needed
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  }

  return (
    <div className="form-container">
      <div className="column">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ISBN">ISBN:</label>
          <input
            type="text"
            className="input-field"
            placeholder="ISBN"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <select
            className="input-field"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select Genre</option>
            {genres.filter(g => g.display !== false).map((g) => (

              <option key={g._id} value={g.genre}>
                {g.genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="language">Language:</label>
          <select
            className="input-field"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            {languages.filter(l => l.display !== false).map((l) => (
            <option key={l._id} value={l.language}>
            {l.language}
            </option>
            ))}

          </select>
        </div>
        <div>
          <label htmlFor="publicationDate">Publication Date:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Publication Date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>
      </div>
      <div className="column">
        <div>
          <label htmlFor="publisher">Publisher:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            className="input-field"
            onChange={(e) => setCoverImageFile(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="freeview1">Freeview 1:</label>
          <input
            type="file"
            className="input-field"
            onChange={(e) => setFreeview1File(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="freeview2">Freeview 2:</label>
          <input
            type="file"
            className="input-field"
            onChange={(e) => setFreeview2File(e.target.files[0])}
          />
        </div>

        {/* Button to add book */}
        <div className="text-right">
          <button className="button" onClick={addBook}>
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addbook;
