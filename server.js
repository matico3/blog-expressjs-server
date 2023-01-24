import express from "express";
import cors from "cors";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import bodyParser from "body-parser";

const db = new LowSync(new JSONFileSync("db.json"));

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

app.get("/blogs", (req, res) => {
  db.read();

  const blogs = db.data.blogs;

  return res.json(blogs);
});

app.get("/blogs/:id", (req, res) => {
  db.read();
  const { id } = req.params;

  const blogs = db.data.blogs.filter((blog) => {
    return blog.id === parseInt(id);
  })[0];

  return res.json(blogs);
});

app.post("/blogs", (req, res) => {
  db.read();

  const id = db.data.blogs.length + 1;
  const newBlog = { ...req.body, id };
  const blogs = [...db.data.blogs, newBlog];

  db.data = { blogs };
  db.write();

  return res.json(newBlog);
});

app.delete("/blogs/:id", (req, res) => {
  db.read();
  const { id } = req.params;

  const blogs = db.data.blogs.filter((blog) => {
    return blog.id !== parseInt(id);
  });

  db.data = { blogs };
  db.write();

  return res.json(blogs);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
