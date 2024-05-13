const express = require('express');
const router = express.Router();

let controller = require('./../controllers/moviesController');

router.route('/')
    .get(controller.getAllMovies)
    .post(controller.addNewMovie)

router.route('/:id')
    .patch(controller.updateMovie)
    .delete(controller.deleteMovie)

module.exports = router