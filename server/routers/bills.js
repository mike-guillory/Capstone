const {Router, response} = require("express");
const Bill = require("../models/Bill");
const { request } = require("http");
const router = Router();

router.post("/", (request, response) => {
  const newBill = new Bill(request.body);
  newBill.save((error, record) => {

  });
});

module.exports = router;
