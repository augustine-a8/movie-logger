const express = require("express");
const movieControllers = require("../controllers/movie-controllers");

const { getAllMoviesController, addMovieController } = movieControllers;

const { Router } = express;

const MovieRouter = Router();

MovieRouter.get("/all", getAllMoviesController);
MovieRouter.post("/add-movie", addMovieController);

module.exports = MovieRouter;
