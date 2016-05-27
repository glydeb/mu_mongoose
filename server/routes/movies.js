var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

router.get('/', function (req, res) {
  Movie.find({}, function (err, movies) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(movies);
  });
});

router.post('/', function (req, res) {
  var movie = new Movie(req.body);
  movie.save(function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(201);
  });
});

router.put('/:id', function (req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body, function (err, movie) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.status(204).send(movie);
  });
});

router.delete('/:id', function (req, res) {
  Movie.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(204);
  });
});

router.put('/:id/comments', function (req, res) {
  var id = req.params.id;
  var comment = req.body; // {content: <some comment>}

  Movie.findById(id, function (err, movie) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    movie.comments.push(comment);

    movie.save(function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
    });
  });
});

module.exports = router;
