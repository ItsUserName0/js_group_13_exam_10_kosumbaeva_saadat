const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const db = require('../mySqlDb');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [news] = await db.getConnection().execute('SELECT id, title, image, date FROM news');
    return res.send(news);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [news] = await db.getConnection().execute('SELECT * FROM news WHERE id = ?', [req.params.id]);
    const data = news[0];
    if (!data) {
      return res.status(404).send({message: 'Not found'});
    }
    return res.send(data);
  } catch (e) {
    next(e);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({message: 'Title is required'});
    }
    if (!req.body.description) {
      return res.status(400).send({message: 'Description is required'});
    }
    const newsData = {
      title: req.body.title,
      description: req.body.description,
      image: null,
    };
    if (req.file) {
      newsData.image = req.file.filename;
    }
    let query = 'INSERT INTO news (title, description, image) VALUES (?, ?, ?)';
    const [results] = await db.getConnection().execute(query, [
      newsData.title,
      newsData.description,
      newsData.image,
    ]);
    res.send({message: `Created news with id ${results.insertId}`});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db.getConnection().execute('DELETE FROM news WHERE id =?', [req.params.id]);
    return res.send({message: `Deleted news with id = ${req.params.id}`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;