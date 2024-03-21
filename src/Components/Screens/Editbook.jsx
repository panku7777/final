import React, { useEffect, useState } from 'react';
import { Input, Button, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

function EditBook({ bookId }) {
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    ISBN: '',
    genre: '',
    publicationDate: '',
    language: '',
    publisher: '',
    description: '',
    coverImageFile: null,
    freeview1File: null,
    freeview2File: null,
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/genres');
        setGenres(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/languages');
        setLanguages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/books/getbookbyid/${bookId}`);
        setBookDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [bookId]);

  const handleUpdateBook = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', bookDetails.title);
      formData.append('author', bookDetails.author);
      formData.append('ISBN', bookDetails.ISBN);
      formData.append('genre', bookDetails.genre);
      formData.append('publicationDate', bookDetails.publicationDate);
      formData.append('language', bookDetails.language);
      formData.append('publisher', bookDetails.publisher);
      formData.append('description', bookDetails.description);

      if (bookDetails.coverImageFile) {
        formData.append('coverImage', bookDetails.coverImageFile);
      }

      if (bookDetails.freeview1File) {
        formData.append('freeview1', bookDetails.freeview1File);
      }

      if (bookDetails.freeview2File) {
        formData.append('freeview2', bookDetails.freeview2File);
      }

      const response = await axios.put(`http://localhost:3005/api/books/updatebook/${bookId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleFileChange = (file, field) => {
    setBookDetails({
      ...bookDetails,
      [`${field}File`]: file,
    });
  };

  const handleInputChange = (value, key) => {
    setBookDetails({
      ...bookDetails,
      [key]: value,
    });
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <label>Title:</label>
      <Input
        placeholder='Book Title'
        value={bookDetails.title}
        onChange={(e) => handleInputChange(e.target.value, 'title')}
      />

      <label>Author:</label>
      <Input
        placeholder='Author'
        value={bookDetails.author}
        onChange={(e) => handleInputChange(e.target.value, 'author')}
      />

      <label>ISBN:</label>
      <Input
        placeholder='ISBN'
        value={bookDetails.ISBN}
        onChange={(e) => handleInputChange(e.target.value, 'ISBN')}
      />

      <label>Genre:</label>
      <Select
        placeholder='Select Genre'
        value={bookDetails.genre}
        onChange={(value) => handleInputChange(value, 'genre')}
      >
        {genres.map(genre => (
          <Option key={genre._id} value={genre.genre}>{genre.genre}</Option>
        ))}
      </Select>

      <label>Publication Date:</label>
      <Input
        placeholder='Publication Date'
        value={bookDetails.publicationDate}
        onChange={(e) => handleInputChange(e.target.value, 'publicationDate')}
      />

      <label>Language:</label>
      <Select
        placeholder='Select Language'
        value={bookDetails.language}
        onChange={(value) => handleInputChange(value, 'language')}
      >
        {languages.map(language => (
          <Option key={language._id} value={language.language}>{language.language}</Option>
        ))}
      </Select>

      <label>Publisher:</label>
      <Input
        placeholder='Publisher'
        value={bookDetails.publisher}
        onChange={(e) => handleInputChange(e.target.value, 'publisher')}
      />

      <label>Description:</label>
      <Input.TextArea
        placeholder='Description'
        value={bookDetails.description}
        onChange={(e) => handleInputChange(e.target.value, 'description')}
      />

      <label>Cover Image:</label>
      <Input
        type='file'
        onChange={(e) => handleFileChange(e.target.files[0], 'coverImage')}
      />

      <label>Freeview 1:</label>
      <Input
        type='file'
        onChange={(e) => handleFileChange(e.target.files[0], 'freeview1')}
      />

      <label>Freeview 2:</label>
      <Input
        type='file'
        onChange={(e) => handleFileChange(e.target.files[0], 'freeview2')}
      />

      <Button type='primary' className='mt-3' onClick={handleUpdateBook} loading={loading}>
        Update Book
      </Button>
    </div>
  );
}

export default EditBook;
