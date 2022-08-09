var express = require("express");
var router = express.Router();
const sql = require("../dboperation");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//test connection
router.get("/testconnect", function (req, res, next) {
  sql.getdata();
  res.render("index", { title: "Express" });
});

router.get("/getdata", function (req, res, next) {
  sql.getdata_withQuery().then((result) => {
    res.json(result);
  });
});

router.get("/procedure", function (req, res, next) {
  sql.get_Get_Category_List().then((result) => {
    res.json(result.recordset);
  });
});

module.exports = router;
