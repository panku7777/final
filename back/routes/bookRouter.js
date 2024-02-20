// bookRouter.js

const express = require("express");
const multer = require("multer");
const router = express.Router();
const Book = require("../model/book");
const storage = multer.memoryStorage(); // Store files as buffers in memory
const upload = multer({ storage: storage });

// Route to handle adding a new book
router.post("/addbook", upload.fields([
  { name: "coverImageURL", maxCount: 1 },
  { name: "freeview1Url", maxCount: 1 },
  { name: "freeview2Url", maxCount: 1 },
]), async (req, res) => {
  try {
    const { title, author, ISBN, genre, language, publicationDate, publisher, description ,display} = req.body;
    const imageFiles = req.files;

    const newBook = new Book({
      title,
      author,
      ISBN,
      genre,
      language,
      publicationDate,
      publisher,
      description,
      display,
      coverImageURL: {
        data: imageFiles["coverImageURL"][0].buffer,
        contentType: imageFiles["coverImageURL"][0].mimetype,
      },
      freeview1Url: {
        data: imageFiles["freeview1Url"][0].buffer,
        contentType: imageFiles["freeview1Url"][0].mimetype,
      },
      freeview2Url: {
        data: imageFiles["freeview2Url"][0].buffer,
        contentType: imageFiles["freeview2Url"][0].mimetype,
      },
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getbookbyid/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Other routes for getting all books, updating, and deleting



router.get('/getallbooks', async (req, res) => {
  try {
    const allBooks = await Book.find().select('title author ISBN genre publicationDate language publisher description coverImageURL');

    // Convert image data to base64 encoded strings
    const updatedBooks = await Promise.all(allBooks.map(async (book) => {
      const coverImageBuffer = Buffer.from(book.coverImageURL.data, 'base64');
      const base64CoverImage = coverImageBuffer.toString('base64');
      return {
        ...book._doc,
        coverImageURL: {
          contentType: book.coverImageURL.contentType,
          data: base64CoverImage
        }
      };
    }));

    res.status(200).json(updatedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/updatebook/:id', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'freeview1', maxCount: 1 },
  { name: 'freeview2', maxCount: 1 },
]), async (req, res) => {
  const bookId = req.params.id;
  const updatedBookDetails = req.body;
  const imageFiles = req.files;

  try {
    if (imageFiles) {
      if (imageFiles['coverImage']?.length > 0) {
        updatedBookDetails.coverImage = {
          data: imageFiles['coverImage'][0].buffer,
          contentType: imageFiles['coverImage'][0].mimetype,
        };
      }
      
      if (imageFiles['freeview1']?.length > 0) {
        updatedBookDetails.freeview1 = {
          data: imageFiles['freeview1'][0].buffer,
          contentType: imageFiles['freeview1'][0].mimetype,
        };
      }
      
      if (imageFiles['freeview2']?.length > 0) {
        updatedBookDetails.freeview2 = {
          data: imageFiles['freeview2'][0].buffer,
          contentType: imageFiles['freeview2'][0].mimetype,
        };
      }
    }

    if (Object.keys(updatedBookDetails).length > 0) {
      await Book.updateOne({ _id: bookId }, { $set: updatedBookDetails });
      res.send('Book updated successfully');
    } else {
      res.send('No files uploaded. Book details remain unchanged.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete("/deletebook/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const deletedBook = await Book.findOneAndDelete({ _id: bookId });
    if (deletedBook) {
      res.send("Book deleted successfully");
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.put('/activate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, { display: true }, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to deactivate a book

router.put('/deactivate/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.display = false; // Assuming 'display' is the property to control book activation
    await book.save();
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
