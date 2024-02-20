import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'antd'; // Assuming you have Ant Design components
import EditLanguage from '../Screens/Editlanguage'; // Adjust the import path based on your project structure
import './Languagetable.css'; // Import the CSS file

function LanguageTable() {
  const [languages, setLanguages] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedLanguageId, setSelectedLanguageId] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/languages');
      setLanguages(response.data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditLanguage = (languageId) => {
    setVisible(true);
    setSelectedLanguageId(languageId);
  };

  const handleModalCancel = () => {
    setVisible(false);
    setSelectedLanguageId('');
  };

  const handleActivateLanguage = async (languageId) => {
    try {
      setLoader(true);
      await axios.put(`http://localhost:3005/api/languages/activate/${languageId}`, { display: true });
      fetchData();
      setLoader(false);
      alert("Activated");
    } catch (error) {
      console.error(error);
      setLoader(false);
      // Show error message
    }
  };

  const handleDeactivateLanguage = async (languageId) => {
    try {
      setLoader(true);
      await axios.put(`http://localhost:3005/api/languages/deactivate/${languageId}`, { display: false });
      fetchData();
      setLoader(false);
      alert("Deactivated");
    } catch (error) {
      console.error(error);
      setLoader(false);
      // Show error message
    }
  };

  return (
    <div className="language-table-container">
      <h2>Language Table</h2>
      <table className="language-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Language</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language) => (
            <tr key={language._id}>
              <td>{language._id}</td>
              <td>{language.language}</td>
              <td>
                {language.display ? (
                  <button onClick={() => handleDeactivateLanguage(language._id)}>Deactivate</button>
                ) : (
                  <button onClick={() => handleActivateLanguage(language._id)}>Activate</button>
                )}
              </td>
              <td>
                <button className='edit-button' onClick={() => handleEditLanguage(language._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EditLanguage Modal */}
      <Modal
        title='Edit Language'
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <EditLanguage languageId={selectedLanguageId} />
      </Modal>
    </div>
  );
}

export default LanguageTable;
