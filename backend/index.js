const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 8080;

app.use(morgan("tiny"));

app.get("/test", (req, res) => res.json("test ok"));

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
