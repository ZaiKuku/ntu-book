import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pg from "pg";
const { Client } = pg;

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

// Connect to PostgreSQL
const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  connectionTimeoutMillis: 5000,
});

await client
  .connect()
  .then(() => {
    // Successfully connected to PostgreSQL server
    app.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`)
    );
    console.log("Connected to PostgreSQL server");
  })
  .catch((error) => {
    // Catch any errors that occurred while starting the server
    console.log(error.message);
  });

export const db = client;
