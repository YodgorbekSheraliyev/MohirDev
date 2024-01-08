const { Router } = require("express");
const router = Router();
const path = require("path");

const {users} = require("./users");

router.get("/", (req, res) => {
  console.log(users.users);
  res.render("main", {
    title: 'Users list',
     users
  });
});

module.exports = router;
