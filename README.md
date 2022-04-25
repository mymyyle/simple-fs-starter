# Simple Full-stack Application

This is a template for a basic fullstack web using as exercise during the Full stack Web Development bootcamp of CoderSchool.vn

## Overview

#### Stack : HTML CSS JS Node JS and Express JS

#### API :

Build 2 endpoints for GET methods

- /students : return all student, allow search by age or name
- /students/:id : return single student with the match id

### Database :

Using data from given `db.json` file

#### Front-end :

Build a simple layout to display server response also UI for making search request.

## Instruction :

1. Clone this codebase
2. check gitignore
3. npm i
4. Import data from `db.json`
5. In `routes/index.js` , identify the callback of `route.get("/students")`
6. Ignore the commented code for now
7. Add a function that sending a list of all students
8. Uncommented the commented code, save and :

   1. Try on your browser : "http://localhost:5000/students?age=3"
   2. Check the console log
   3. Try on your browser : "http://localhost:5000/students?name=tuan"
   4. Check the console log
   5. Guess what was happening ? then
   6. Refactor the code so that when this route is called, it return a list of student that match accordingly to `name` or `age` query. **And** also send a list of all students if there is no query eg "http://localhost:5000/students"

9. In `routes/index.js` , identify the callback of `ruote.get("/students/:id")`
10. Add a function that send back to client the correct info of the student id requested
11. Test on browser : "http://localhost:5000/students/(input an id here)" to see if we success

12. Create a simple front-end website HTML CSS and JS that using your newly created api to :
    1. Display a list of student, everylist is clickable
    2. Make an age search box to input age then **make call to correct api endpoint**
    3. Display a list of students that match the search in your UI of choice
    4. Make an name search box to input age then **make call to correct api endpoint**
    5. Display a list of students that match the search in your UI of choice

**Bounus**: Fullstack Web Application

- Turn every student listing into a clickable element
- When click , make a call to http://localhost:5000/students\studentIDofTheClicked"
- Display the result in your UI of choice
- Beautify your first **Full-stack Web Application**

...

## Requirement

1. Route return all students list with limit 10 student per request and able to use **page** query to navigate more.

- Could also change **limit**.(R)

eg. db={1,2,3,4,5,6,7,8,9,10,11,12}
("host/students"), 10 student info [1..10] ...
("host/students?page=2") [11..12]
("host/students?page=3") [..]

("host/students?page=4&limit=2") [7,8]

2. Route add new students into db if receive {name,email,password}.Email have to be unique otherwise send back error response message "user email is existed". Append into db, not replace.(C)

3. Route update password of student if receive correct {email, password} and {newPassword}. if email can not be found in db,response with error message "User not found". if email found but password is not match, response with error message "Password is not match". Update password = newPassword in database (db.json) (U)

4. Route delete student from database if receive correct {email,password}. (D)

5. Rocket : Whenever student is created, we also create a random hex string as id for that student and save it in the d
   Hint:

```
const crypto = require("crypto");
utilsHelper.generateRandomHexString = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};

```
