const express = require('express');
const db = require('./mySqlDb');
const news = require('./app/news');
const app = express();

const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/news', news);

const run = async () => {
  await db.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
};

run().catch(e => console.error(e));

