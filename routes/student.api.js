const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// SASAA LOVE MYMYY <3

// const data = {};
const getData = () => {
  try {
    const response = fs.readFileSync(
      path.resolve(__dirname, "../db.json"),
      "utf8"
    );
    return JSON.parse(response);
  } catch (error) {
    console.log(error);
    return [];
  }
  // const response = fs.readFileSync("./db.json", "utf8");
};
/* GET students. */
router.get("/", function (req, res, next) {
  let data = getData();

  const queries = req.query;
  if (queries.age) {
    data = data.filter((ele) => ele.age === Number(queries.age));
  }
  if (queries.name) {
    data = data.filter((ele) =>
      ele.name.toLowerCase().includes(queries.name.toLowerCase())
    );
  }

  return res.status(200).send(data);
});

/* GET students. */
router.get("/:id", function (req, res, next) {
  let data = getData();
  const params = req.params;
  console.log(params);
  if (params.id) {
    data = data.filter((ele) => ele.id === params.id);
  }

  return res.status(200).send(data);
});

module.exports = router;
