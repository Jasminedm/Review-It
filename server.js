const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

var db, collection;

const url =
  "mongodb+srv://jasminedm:jdmmongodb@cluster0.0xxrpxp.mongodb.net/bReview?retryWrites=true&w=majority";
const dbName = "bReview";

app.listen(3000, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("reviews")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", { messages: result });
    });
});

app.post("/reviews", (req, res) => {
  db.collection("reviews").insertOne(
    {
      img: req.body.img,
      business: req.body.business,
      review: req.body.review,
      rating: 0,
      heart: false,
    },
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});

app.put("/reviews", (req, res) => {
  db.collection("reviews").findOneAndUpdate(
    { _id: ObjectId(req.body.id) },
    {
      $set: {
        rating: req.body.rating,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      //Sending the response
      res.send(result);
    }
  );
});

app.put("/favorites", (req, res) => {
  db.collection("reviews").findOneAndUpdate(
    { _id: ObjectId(req.body.id) },
    {
      $set: {
        heart: !req.body.heart,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      //Sending the response
      res.send(result);
    }
  );
});

app.delete("/reviews", (req, res) => {
  console.log('deleted')
  db.collection("reviews").findOneAndDelete(
    { _id: ObjectId(req.body.id) },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
      
    }
  );
});
