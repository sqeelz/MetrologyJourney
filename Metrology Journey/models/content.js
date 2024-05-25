// models/Content.js
const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', ContentSchema);
