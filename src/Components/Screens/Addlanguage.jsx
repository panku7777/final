// AddLanguageForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './Addlanguage.css'; // Import the external CSS file

function AddLanguageForm() {
  const [language, setLanguage] = useState('');

  async function addLanguage() {
    try {
      // Validate language
      if (!language.trim()) {
        alert('Please enter a valid language.');
        return;
      }
  
      const newLanguage = {
        language: language.trim(),
        display: 1, // Set display to be 1 when adding a new language
      };
  
      const response = await axios.post('http://localhost:3005/api/languages/add', newLanguage);
      console.log(response.data);
  
      // Handle success if needed
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  }
  

  return (
    <div className="form-container">
      <label htmlFor="language">Language:</label><br/>
      <div className="input-button-container">
        <input
          type="text"
          className="input-field"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <button className="button" onClick={addLanguage}>
          Add Language
        </button>
      </div>
    </div>
  );
}

export default AddLanguageForm;
