const {Router, response} = require("express");
const { request } = require("http");
const Bill = require("../models/Bill");
const router = Router();

// CREATE
router.post("/", (request, response) => {

  const newBill = new Bill(request.body);

  newBill.save((error, record) => {
    if (error?.name === "ValidationError") return response.status(400).json(error.errors);
    if (error) return response.status(500).json(error.errors);

    response.json(record);
  });
});

// READ ALL
router.get("/", (request, response) => {
  Bill.find({}, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
});

// READ ONE
router.get("/:id", (request, response) => {
  Bill.findById(request.params.id, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
})

// UPDATE
router.put("/:id", (request, response) => {

  const body = request.body;

  Bill.findByIdAndUpdate(request.params.id,
    {
      $set:{
        name: body.name,
        amount: body.amount,
        total: body.total,
        dueDate: body.dueDate,
        paidFrom: body.paidFrom,
        adjustedPayDate: body.adjustedPayDate
      }
    },
    {
      new: true, // Return the updated record
      upsert: true // Creat the record if it doesn't already exist
    },
    (error, record) => {

      if (error?.name === "ValidationError") return response.status(400).json(error.errors);
      if (error) return response.status(500).json(error.errors);

      response.json(record);
    }
  );
})

// DELETE
router.delete("/:id", (request, response) => {
  Bill.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
});

module.exports = router;
