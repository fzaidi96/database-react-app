import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

const app = express();
app.use(express.json());
app.use(cors());
app.listen("https://database-react-app-server.onrender.com", function () {
    console.log("Server listening");});

app.get("/", async (request, response) => {
  const result = await db.query("SELECT * FROM message_board ");
  response.json(result.rows);
  });
  
app.post("=/", async (request, response) => {
  const username = request.body.username;
  const post = request.body.post;
  const topic = request.body.topic;
  
  const newPost = await db.query("INSERT INTO message_board (username, post, topic) VALUES ($1, $2, $3) RETURNING *", [username, post, topic]);
  response.json(newPost.rows[0]);
  });
  
  app.delete("/:id", async (request, response) => {
    const recordId = request.params.id;
    const result = await db.query("DELETE FROM message_board WHERE id = $1", [recordId]);
    response.json(result.rows[0]);
  });

  

  