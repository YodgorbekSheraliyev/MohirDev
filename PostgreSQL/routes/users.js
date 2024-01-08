const { Router } = require("express");
const {
  getAddUsersPage,
  addNewUser,
  updateUserPage,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const router = Router();

router.get("/add-user", getAddUsersPage);
router.get("/edit/:id", updateUserPage);

router.post("/users", addNewUser);
router.post("/edit/:id", updateUser);
router.post("/delete/:id", deleteUser);

exports.router = router;
