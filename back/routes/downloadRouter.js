const express = require('express');
const router = express.Router();
const Download = require('../model/download');

router.post("/add", async (req, res) => {
    try {
        const { userId, bookId, title, author, ISBN, genre, language, publicationDate, publisher, description, coverImage } = req.body;

        // Create a new Download object
        const newDownload = new Download({
            userId,
            bookId,
            title,
            author,
            ISBN,
            genre,
            language,
            publicationDate,
            publisher,
            description,
            coverImageUrl: coverImage // Save the cover image URL as a string directly
        });

        // Save the new download to the database
        const savedDownload = await newDownload.save();

        // Respond with a success message
        res.status(201).json(savedDownload);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/getdownloadsbyid/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        // Assuming you have a Download model with a field userId to store the user's ID
        const downloads = await Download.find({ userId });

        if (downloads.length > 0) {
            res.status(200).json(downloads);
        } else {
            res.status(404).json({ error: "No downloads found for the given user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
