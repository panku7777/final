import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BooksTable.css'; // Import the CSS file for styling
import { Modal } from 'antd'; // Assuming you have Ant Design components
import EditBook from '../Screens/Editbook'; // Adjust the import path based on your project structure

function Books() {
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/books/getallbooks');
      setBooks(response.data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditBook = (bookId) => {
    setVisible(true);
    setSelectedBookId(bookId);
  };

  const handleModalCancel = () => {
    setVisible(false);
    setSelectedBookId('');
  };

  const handleActivateBook = async (bookId) => {
    try {
      setLoader(true);
      await axios.put(`http://localhost:3005/api/books/activate/${bookId}`);
      fetchData();
      setLoader(false);
      alert("Book activated successfully");
    } catch (error) {
      console.error(error);
      setLoader(false);
      alert("Failed to activate book");
    }
  };

  const handleDeactivateBook = async (bookId) => {
    try {
      setLoader(true);
      await axios.put(`http://localhost:3005/api/books/deactivate/${bookId}`);
      fetchData();
      setLoader(false);
      alert("Book deactivated successfully");
    } catch (error) {
      console.error(error);
      setLoader(false);
      alert("Failed to deactivate book");
    }
  };

  return (
    <div className="books-container">
      <h1>Books</h1>
      <table className='books-table'>
        <thead>
          <tr>
            <th>BookID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Genre</th>
            <th>Publication Date</th>
            <th>Language</th>
            <th>Publisher</th>
            <th>Description</th>
            <th>Display</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index}>
                <td>{book._id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.ISBN}</td>
                <td>{book.genre}</td>
                <td>{book.publicationDate}</td>
                <td>{book.language}</td>
                <td>{book.publisher}</td>
                <td>{book.description}</td>
                <td>
                  {book.display ? (
                    <button
                      className='deactivate-button'
                      onClick={() => handleDeactivateBook(book._id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className='activate-button'
                      onClick={() => handleActivateBook(book._id)}
                    >
                      Activate
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className='edit-button'
                    onClick={() => handleEditBook(book._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No books available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* EditBook Modal */}
      <Modal
        title='Edit Book'
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <EditBook bookId={selectedBookId} />
      </Modal>
    </div>
  );
}

export default Books;
