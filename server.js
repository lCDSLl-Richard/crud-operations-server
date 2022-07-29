const { urlencoded } = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const config = require("./config.js");

const app = express();
const port = config.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));

mongoose.connect(config.DB);

const PersonSchema = new Schema({
  name: String,
  date: Date,
  mail: String,
});

const Person = mongoose.model("Person", PersonSchema);

app.get("/", (req, res) => {
  res.send("Welcome to the people API");
});

app.get("/people", async (req, res) => {
  const { name, mail } = req.query;

  const filter = {};

  if (name) {
    filter.name = name;
  }
  if (mail) {
    filter.mail = mail;
  }

  const people = await Person.find(filter);

  res.send(people);
});

app.post("/addPerson", (req, res) => {
  const { name, date, mail } = req.body;
  const nPerson = new Person({ name, date, mail });
  nPerson.save().then(() => res.send("Safe successful"));
});

app.patch("/editPerson", async (req, res) => {
  const { id, name, date, mail } = req.query;
  console.log(id);

  if (!id) {
    res.send("No id");
    return;
  }

  const ePerson = await Person.findOne({ _id: id });
  console.log(ePerson);

  const nPerson = {};

  nPerson.name = name ? name : ePerson.name;
  nPerson.date = date ? date : ePerson.date;
  nPerson.mail = mail ? mail : ePerson.mail;

  if (nPerson) {
    await Person.replaceOne({ _id: id }, nPerson);
    res.send("Successful");
    return;
  }
  res.send("Error");
});

app.delete("/deletePerson", async (req, res) => {
  const id = req.query.id;

  await Person.deleteOne({ _id: id });
  res.send("Finished");
});

app.listen(port, () => console.log(`Listening port ${port}`));
