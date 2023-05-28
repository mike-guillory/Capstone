const {Router, response} = require("express");
const {request} = require("http");
const PayDay = require("../models/PayDay");
const router = Router();

// CREATE
router.post("/", (request, response) => {

  const newPayDay = new PayDay(request.body);

  newPayDay.save((error, record) => {
    if (error?.name === "ValidationError") return response.status(400).json(error.errors);
    if (error) return response.status(500).json(error.errors);

    response.json(record);
  });
});

// READ ALL
router.get("/", (request, response) => {
  PayDay.find({}, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
});

// READ ONE
router.get("/:id", (request, response) => {
  PayDay.findById(request.params.id, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
})

// UPDATE
router.put("/:id", (request, response) => {

  const body = request.body;

  PayDay.findByIdAndUpdate(request.params.id,
    {
      $set:{
        paySource: body.name,
        amount: body.amount,
        payDate: body.payDate
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
  PayDay.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
});

module.exports = router;
