import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

const insertPost = await db.query("INSERT INTO message_board (username, post, topic) VALUES ($1, $2, $3) RETURNING *",[username, post, topic]);


i really couldn't figure out how to seed my database with seed.js at all so did it in Supabase. Here's the code:

CREATE TABLE message_board (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    post TEXT,
    topic VARCHAR(255)
);

INSERT INTO message_board (username, post, topic)
VALUES
  (('fatima'), ('the last movie I watched was Reservoir Dogs'), ('#movies')),
  (('sarah'), ('I am listening to Nicki Minaj'), ('#music')),
  (('ana'), ('I still need to watch Saltburn'), ('#movies')),
  (('afrah'), ('Michael Phelps is the GOAT'), ('#sports')),
  (('jack'), ('yes, and?'), ('#music'))

