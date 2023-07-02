import express from "express";
import { ObjectId } from "mongodb";
import cors from "cors";

import { connect_to_cluster } from "./db.js";
const client = await connect_to_cluster();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
//List all players
app.get("/", async (req, res) => {
  const result = await client
    .db("football")
    .collection("manu")
    .find()
    .toArray();

  res.send(result);
});

app.get("/player/:name", async (req, res) => {
  const name = req.params.name;

  const result = await client
    .db("football")
    .collection("manu")
    .find({ name: name })
    .toArray();

  res.send(result);
});

app.post("/player", async (req, res) => {
  console.log(req.body);

  const result = await client
    .db("football")
    .collection("manu")
    .insertOne(req.body);

  res.send("");
});

app.delete("/player/:id", async (req, res) => {
  console.log(req.params);
  const result = await client
    .db("football")
    .collection("manu")
    .deleteOne({ _id: new ObjectId(req.params.id) });

  console.log(result);
  res.status(200).send("");
});
app.put("/player/:id", async (req, res) => {
  const result = await client
    .db("football")
    .collection("manu")
    .replaceOne({ _id: new ObjectId(req.params.id) }, req.body);

  res.status(200).send("");
});

app.listen(port, "localhost", 0, () => {
  console.log("Sever listening");
});
