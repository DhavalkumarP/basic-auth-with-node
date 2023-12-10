import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
import router from "./router";

env.config();

const app = express();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (err: Error) => {
    console.error(err);
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

app.use("/", router());