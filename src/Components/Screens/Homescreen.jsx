import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../user/Bookcard';
import './Homescreen.css'; // Import the CSS file

const Homescreen = () => {
  const [books, setBooks] = useState([]);
  const [duplicateBooks, setDuplicateBooks] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('userData'));
  console.log(user)

  if (!user) {
    window.location.href = '/login';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const roomData = (await axios.get('http://localhost:3005/api/books/getallbooks')).data;
        const genreData = await (await axios.get('http://localhost:3005/api/genres')).data;
        const languageData = (await axios.get('http://localhost:3005/api/languages')).data;
  
        // Filter out books where display is false
        const filteredRoomData = roomData.filter(book => book.display !== false);
        
        setBooks(filteredRoomData);
        setDuplicateBooks(filteredRoomData);
        setGenres(genreData);
        setLanguages(languageData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  function filterBySearch() {
    const tempBooks = duplicateBooks.filter(book =>
      book.title.toLowerCase().includes(searchKey.toLowerCase())
    );
    setBooks(tempBooks);
  }

  function filterByGenre(selectedGenre) {
    setSelectedGenre(selectedGenre);
  
    if (selectedGenre.toLowerCase() !== 'all') {
      const filteredBooks = duplicateBooks.filter(book =>
        book.genre.toLowerCase() === selectedGenre.toLowerCase() &&
        (selectedLanguage.toLowerCase() === 'all' || book.language.toLowerCase() === selectedLanguage.toLowerCase())
      );
      setBooks(filteredBooks);
    } else {
      if (selectedLanguage.toLowerCase() !== 'all') {
        const filteredBooks = duplicateBooks.filter(book =>
          book.language.toLowerCase() === selectedLanguage.toLowerCase()
        );
        setBooks(filteredBooks);
      } else {
        setBooks(duplicateBooks);
      }
    }
  }
  
  function filterByLanguage(selectedLanguage) {
    setSelectedLanguage(selectedLanguage);
  
    if (selectedLanguage.toLowerCase() !== 'all') {
      const filteredBooks = duplicateBooks.filter(book =>
        book.language.toLowerCase() === selectedLanguage.toLowerCase() &&
        (selectedGenre.toLowerCase() === 'all' || book.genre.toLowerCase() === selectedGenre.toLowerCase())
      );
      setBooks(filteredBooks);
    } else {
      if (selectedGenre.toLowerCase() !== 'all') {
        const filteredBooks = duplicateBooks.filter(book =>
          book.genre.toLowerCase() === selectedGenre.toLowerCase()
        );
        setBooks(filteredBooks);
      } else {
        setBooks(duplicateBooks);
      }
    }
  }
  
  return (
    <div className='homescreen-container'>
      <div className='homescreen-search'>
        <input
          type='text'
          className='form-control'
          placeholder='Search Books'
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyUp={filterBySearch}
        />
        <select className='form-control' value={selectedGenre} onChange={(e) => filterByGenre(e.target.value)}>
          <option value='all'>All Genres</option>
          {genres.map(genre => (
            <option key={genre._id} value={genre.genre}>
              {genre.genre}
            </option>
          ))}
        </select>
       <select className='form-control' value={selectedLanguage} onChange={(e) => filterByLanguage(e.target.value)}>
  <option value='all'>All Languages</option>
  {languages.map(language => (
    <option key={language._id} value={language.language}>
      {language.language}
    </option>
  ))}
</select>

      </div>
      <div className='homescreen-room-list'>
        {books.map(book => (
          <div className='room-card' key={book._id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homescreen;
