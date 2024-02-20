import React, { useEffect, useState } from 'react';
import { Input, Button, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

function EditBook({ bookId }) {
  const [loading, setLoading] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    ISBN: '',
    genre: '',
    publicationDate: '',
    language: '',
    publisher: '',
    description: '',
    coverImageURL: '',
    freeview1Url: '',
    freeview2Url: '',
    coverImageFile: null,
    freeview1File: null,
    freeview2File: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/books/getbookbyid/${bookId}`);
        setBookDetails(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
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
      // Handle error
    }
  };

  const handleFileChange = (file, field) => {
    setBookDetails({
      ...bookDetails,
      [`${field}File`]: file,
    });
  };

  const handleInputChange = (e, key) => {
    setBookDetails({
      ...bookDetails,
      [key]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <label>Title:</label>
      <Input
        placeholder='Book Title'
        value={bookDetails.title}
        onChange={(e) => handleInputChange(e, 'title')}
      />

      <label>Author:</label>
      <Input
        placeholder='Author'
        value={bookDetails.author}
        onChange={(e) => handleInputChange(e, 'author')}
      />

      <label>ISBN:</label>
      <Input
        placeholder='ISBN'
        value={bookDetails.ISBN}
        onChange={(e) => handleInputChange(e, 'ISBN')}
      />

      <label>Genre:</label>
      <Input
        placeholder='Genre'
        value={bookDetails.genre}
        onChange={(e) => handleInputChange(e, 'genre')}
      />

      <label>Publication Date:</label>
      <Input
        placeholder='Publication Date'
        value={bookDetails.publicationDate}
        onChange={(e) => handleInputChange(e, 'publicationDate')}
      />

      <label>Language:</label>
      <Input
        placeholder='Language'
        value={bookDetails.language}
        onChange={(e) => handleInputChange(e, 'language')}
      />

      <label>Publisher:</label>
      <Input
        placeholder='Publisher'
        value={bookDetails.publisher}
        onChange={(e) => handleInputChange(e, 'publisher')}
      />

      <label>Description:</label>
      <Input
        placeholder='Description'
        value={bookDetails.description}
        onChange={(e) => handleInputChange(e, 'description')}
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
