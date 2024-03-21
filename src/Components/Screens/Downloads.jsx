import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadCard from './DownloadsCard';; // Assuming DownloadCard component is in the same directory

function DownloadList() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        setLoading(true);
        // Fetch userId from localStorage
        const userId = JSON.parse(localStorage.getItem('userData'))._id;
        const response = await axios.get(`http://localhost:3005/api/download/getdownloadsbyid/${userId}`);
        setDownloads(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error)
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
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {downloads.map((download, index) => (
            <DownloadCard key={index} download={download} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DownloadList;
