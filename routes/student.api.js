const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const crypto = require("crypto");

const generateRandomHexString = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};

const sendResponse = (data, status, message, res, next) => {
  const result = { data, message };
  return res.status(status).send(result);
};

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
};

/* GET students. */
router.get("/", function (req, res, next) {
  let data = getData();

  const { name, age, page = 1, limit = 10 } = req.query;
  //tra ve obj localhost:5000/api/students?name=tuan&age=3
  if (age) {
    data = data.filter((ele) => ele.age === Number(age));
  }
  if (name) {
    data = data.filter((ele) =>
      ele.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  //page&limit
  const dataLimit = [];
  for (let i = (page - 1) * limit; i <= page * limit - 1; i++) {
    if (i > data.length - 1) break;
    dataLimit.push(data[i]);
  }
  // page 1 : 0-9 -> page-1,
  // 2: 10-19--> (page-1)*limit  .(page*limit)-1
  // 3: 20-29
  return sendResponse(dataLimit, 200, "get list student", res, next);
});

/*Post Students */
const throwError = (message, status) => {
  const error = { message, status };
  throw error;
};

router.post("/", (req, res, next) => {
  const { name, email, password, age } = req.body;
  try {
    if (!age || !name || !email || !password) throwError(`missing info`, 400);
    let data = getData();
    const found = data.findIndex((student) => student.email === email);
    if (found !== -1) throwError(`user email is existed`, 400);
    const newStudent = {
      id: generateRandomHexString(24).toLowerCase(),
      name,
      email,
      password,
      __v: 0,
      age,
    };
    data.push(newStudent);
    fs.writeFileSync(
      path.resolve(__dirname, "../db.json"),
      JSON.stringify(data),
      "utf8"
    );
    return sendResponse([], 200, "add student", res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/", (req, res, next) => {
  const { email, password, newPassword } = req.body;
  try {
    if (!email || !password || !newPassword) throwError(`missing info`, 400);
    let data = getData();
    const foundEmail = data.findIndex((student) => student.email === email);
    if (foundEmail === -1) throwError(`User not found`, 400);
    else if (data[foundEmail].password !== password)
      throwError(`Password is not match`, 400);
    else {
      data[foundEmail].password = newPassword;
      fs.writeFileSync(
        path.resolve(__dirname, "../db.json"),
        JSON.stringify(data),
        "utf8"
      );
      return sendResponse([], 200, "change password success", res, next);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/", (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throwError(`missing info`, 400);
    let data = getData();
    const foundEmail = data.findIndex((student) => student.email === email);
    if (foundEmail === -1) throwError(`User not found`, 400);
    else if (data[foundEmail].password !== password)
      throwError(`Password is not match`, 400);
    else {
      console.log(foundEmail);
      data = data.filter((ele, index) => index !== foundEmail);
      fs.writeFileSync(
        path.resolve(__dirname, "../db.json"),
        JSON.stringify(data),
        "utf8"
      );
      return sendResponse(data, 200, "change password success", res, next);
    }
  } catch (error) {
    next(error);
  }
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
