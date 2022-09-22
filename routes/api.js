const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json','utf8', (err,data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    })
})

router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
      if (err) throw err;
      const newNotes = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
      };
      const db = JSON.parse(data);
      db.push(newNotes);

      fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
        if (err) throw err;
        res.json(db);
      });
    });
  });

  module.exports = router;