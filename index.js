const express = require("express");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/fileSync");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");

const db = lowDb(new FileSync("db.json"));

db.defaults({ blogs: [] }).write();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

app.get("/blogs", (req, res) => {
  const data = db.get("blogs").value();
  console.log("bla");
  return res.json(data);
  //   res.status(200).send({});
});

app.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const data = db.get("blogs/1").value();
  console.log(id);
  return res.json(data);
  //   res.status(200).send({});
});

app.post("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const { blog } = req.body;

  if (!blog) {
    res.status(418).send({ message: "Blog ni bil poslan." });
  }

  db.get("blogs")
    .push({
      ...blogs,
      id: nanoid(),
    })
    .write();

  res.json({ success: true });
  //   res.send({
  //     blog: `Blog z id: ${id} je bil dodan`,
  //   });
});

app.listen(PORT, () => console.log(`it's alive on port http://localhost:${PORT}`));
