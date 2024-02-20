// routes/languages.js

const express = require('express');
const router = express.Router();
const Language = require('../model/language');

// Get all languages
router.get('/', async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new language
router.post('/add', async (req, res) => {
  try {
    const { language } = req.body;
    if (!language) {
      return res.status(400).json({ error: 'Language is required' });
    }

    const existingLanguage = await Language.findOne({ language });
    if (existingLanguage) {
      return res.status(400).json({ error: 'Language already exists' });
    }

    const newLanguage = new Language({ language });
    const savedLanguage = await newLanguage.save();

    res.status(201).json(savedLanguage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updatelanguage/:id', async (req, res) => {
  const languageId = req.params.id;
  const updatedLanguageDetails = req.body;

  try {
    const updatedLanguage = await Language.findByIdAndUpdate(
      languageId,
      { $set: updatedLanguageDetails },
      { new: true } // Return the updated document
    );

    if (!updatedLanguage) {
      return res.status(404).send('Language not found');
    }

    res.json(updatedLanguage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get language by ID
router.post('/getlanguagebyid', async (req, res) => {
  const languageId = req.body.languageId;

  try {
    const language = await Language.findById(languageId);

    if (!language) {
      return res.status(404).send('Language not found');
    }

    res.json(language);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.put('/activate/:languageId', async (req, res) => {
  try {
    const languageId = req.params.languageId;
    const language = await Language.findById(languageId);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    language.display = true;
    await language.save();
    res.json({ message: 'Language activated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to activate language' });
  }
});

router.put('/deactivate/:languageId', async (req, res) => {
  try {
    const languageId = req.params.languageId;
    const language = await Language.findById(languageId);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    language.display = false;
    await language.save();
    res.json({ message: 'Language deactivated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to deactivate language' });
  }
});

module.exports = router;
