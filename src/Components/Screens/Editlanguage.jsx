import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';


function EditLanguage({ languageId, onCancel }) {
  const [languageDetails, setLanguageDetails] = useState({
    language: '',
  });

  useEffect(() => {
    const fetchLanguageDetails = async () => {
      try {
        const response = await axios.post('http://localhost:3005/api/languages/getlanguagebyid', {
  languageId,
});

        setLanguageDetails(response.data);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    if (languageId) {
      fetchLanguageDetails();
    }
  }, [languageId]);

  const handleUpdateLanguage = async () => {
    try {
        const response = await axios.put(`http://localhost:3005/api/languages/updatelanguage/${languageId}`, {
            ...languageDetails,
          });
          

      console.log(response.data);
     alert("updated succesfully").then(() => {
        onCancel(); // Close the modal after successful update
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    setLanguageDetails({
      ...languageDetails,
      language: e.target.value,
    });
  };

  return (
    <div>
      <h2>Edit Language</h2>
      <label>Language:</label>
      <Input
        placeholder='Language'
        value={languageDetails.language}
        onChange={handleInputChange}
      />

      <Button type='primary' className='mt-3' onClick={handleUpdateLanguage}>
        Update Language
      </Button>
    </div>
  );
}

export default EditLanguage;
