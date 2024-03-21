import React, { useState, useEffect } from 'react';
import axios from 'axios';
 // Assuming DownloadCard component is in the same directory

function DownloadList() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        setLoading(true);
        // Fetch userId from localStorage
        const userId = JSON.parse(localStorage.getItem('AdminData'))._id;
        // console.log(JSON.parse(localStorage.getItem('currentuser')))
        const response = await axios.get(`http://localhost:3005/api/download/getalldownloads`);
        setDownloads(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch downloads');
        console.log(error);
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Genre</th>
              <th>Publication Date</th>
              <th>Language</th>
              <th>Publisher</th>
              <th>Description</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {downloads.map((download, index) => (
              <tr key={index}>
                <td>{download.userId}</td>
                <td>{download.title}</td>
                <td>{download.author}</td>
                <td>{download.ISBN}</td>
                <td>{download.genre}</td>
                <td>{download.publicationDate}</td>
                <td>{download.language}</td>
                <td>{download.publisher}</td>
                <td>{download.description}</td>
                {/* Add more table cells with download details as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DownloadList;
