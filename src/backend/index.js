import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Routes
import usersRouter from "./routes/users.js";
import usedBookRouter from "./routes/usedBook.js";
import bookRouter from "./routes/book.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// assign routers to routes
app.use("/api/users", usersRouter);
app.use("/api/usedbook", usedBookRouter);
app.use("/api/book", bookRouter);

const port = process.env.PORT || 8000;

// TODO: Connect to PostgreSQL
