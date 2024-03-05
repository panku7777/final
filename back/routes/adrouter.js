const express = require("express");
const router = express.Router();
const Admin = require("../model/ad"); // Import the Admin model

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newAdmin = new Admin({
      name,
      email,
      password,
    });

    const savedAdmin = await newAdmin.save();
    res.json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundAdmin = await Admin.findOne({ email });

    if (foundAdmin && foundAdmin.password === password) {
      const adminData = {
        name: foundAdmin.name,
        email: foundAdmin.email,
        _id: foundAdmin._id,
      };
      res.json(adminData);
    } else {
      res.status(400).json({ message: "Login Failed: Admin not found or incorrect password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find(); // Change variable name to admins
    res.json(admins); // Change variable name to admins
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
