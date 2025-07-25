const Entry = require("../models/Diary.js");

async function index(req, res) {
  try {
    const entries = await Entry.getAll();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const entry = await Entry.getOneById(id);
    res.status(200).json(entry);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

async function titles(req, res) {
  try {
    const title = req.params.title.toLowerCase();
    const entries = await Entry.getAllByTitle(title);
    res.status(200).json(entries)
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

async function categories(req, res) {
  try {
    const category = req.params.category.toLowerCase();
    const entries = await Entry.getAllByCategory(category);
    res.status(200).json(entries)
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

async function dates(req, res) {
  try {
    const date = req.params.date;
    const entries = await Entry.getAllByDate(date);
    res.status(200).json(entries)
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

async function create(req, res) {
  try {
    const entry = await Entry.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ "error": err.message })
  }
}

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const entry = await Entry.getOneById(id);
    const result = await entry.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await Entry.destroy(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}


module.exports = { index, show, titles, categories, dates, create, update, destroy }
