const express = require('express');
const db = require('../mySqlDb');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let comments;
    if (req.query['news_id']) {
      [comments] = await db.getConnection().execute('SELECT * FROM comments WHERE news_id = ?', [req.query['news_id']]);
      return res.send(comments);
    }
    [comments] = await db.getConnection().execute('SELECT * FROM comments');
    return res.send(comments);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.newsId) {
      return res.status(400).send({message: 'News id is required'});
    }
    if (!req.body.description) {
      return res.status(400).send({message: 'Description is required'});
    }
    const commentData = {
      newsId: req.body.newsId,
      author: null,
      description: req.body.description,
    };
    if (req.body.author) {
      commentData.author = req.body.author;
    }
    const query = 'INSERT INTO comments (news_id, author, description) VALUES (?, ?, ?)';
    const [results] = await db.getConnection().execute(query, [
      commentData.newsId,
      commentData.author,
      commentData.description,
    ]);
    return res.send({message: `Created comment with id = ${results.insertId}`});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db.getConnection().execute('DELETE FROM comments WHERE id = ?', [req.params.id]);
    return res.send({message: `Deleted comment with id = ${req.params.id}`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;