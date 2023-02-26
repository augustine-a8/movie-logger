require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mogoose = require("mongoose");

const checkAuth = require("./middleware/auth-middleware");
const config = require("./config");

const { MONGO, PORT } = config;

const MovieRouter = require("./routes/movie-routes");
const AuthRouter = require("./routes/auth-routes");

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.status(200).send({
        message: "Welcome to the CORS test",
    });
});

app.use("/api/auth", AuthRouter);
app.use("/api/movie", checkAuth, MovieRouter);

startServer();

async function startServer() {
    await mogoose.connect(MONGO, { useNewUrlParser: true }).then(() => {
        console.log("Conneected to mongodb");
        httpServer.listen(PORT, () => {
            console.log(`🚀🚀 server ready at port ${PORT}`);
        });
    });
}
