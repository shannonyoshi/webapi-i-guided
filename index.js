const express = require("express");

const db = require("./data/hubs-model");

const server = express();

server.use(express.json()); //

// route handler
server.get("/", (req, res) => {
  res.send("Hello World");
});
//R in CRUD
server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
//C in CRUD
server.post("/hubs", (req, res) => {
  const hubInfo = req.body;
  db.add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//D in CRUD
server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end(); //.end tells
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//U in CRUD
server.put("/hubs/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));
