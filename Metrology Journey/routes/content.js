// routes/content.js
const express = require('express');
const router = express.Router();
const Content = require('   models/Content');

// Route untuk menambahkan konten
router.post('/', async (req, res) => {
    const newContent = new Content(req.body);
    try {
        await newContent.save();
        res.status(201).send(newContent);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route untuk mendapatkan semua konten
router.get('/', async (req, res) => {
    try {
        const contents = await Content.find();
        res.send(contents);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
