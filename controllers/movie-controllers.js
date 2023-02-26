const MovieModel = require("../models/movie-model");

const getAllMoviesController = async (_, res) => {
    const user = res.locals.user;

    const movies = await MovieModel.find({ owner: user });
    res.status(200).send({
        movies,
    });
};

const addMovieController = async (req, res) => {
    const user = res.locals.user;

    const { title, genre, releaseYear, rating } = req.body;
    if (!title || !rating) {
        res.status(400).send({
            message: "Movie title and rating should be provided",
        });
        return;
    }

    const newMovie = new MovieModel();
    newMovie.title = title;
    newMovie.genre = genre;
    newMovie.rating = rating;
    newMovie.releaseYear = releaseYear;
    newMovie.owner = user;

    await newMovie.save();

    res.status(200).send({
        message: "New movie added",
    });
};

module.exports = {
    getAllMoviesController,
    addMovieController,
};
