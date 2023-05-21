const {Router, response} = require("express");
const {request} = require("http");
const IncomeSource = require("../models/IncomeSource");
const router = Router();

// CREATE
router.post("/", (request, response) => {

  const newIncomeSource = new IncomeSource(request.body);

  newIncomeSource.save((error, record) => {
    if (error?.name === "ValidationError") return response.status(400).json(error.errors);
    if (error) return response.status(500).json(error.errors);

    response.json(record);
  });
});

// READ ALL
router.get("/", (request, response) => {
  IncomeSource.find({}, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
});

// READ ONE
router.get("/:id", (request, response) => {
  IncomeSource.findById(request.params.id, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
})

// UPDATE
router.put("/:id", (request, response) => {

  const body = request.body;

  IncomeSource.findByIdAndUpdate(request.params.id,
    {
      $set:{
        name: body.name,
        amount: body.amount,
        frequency: body.frequency,
        startingDate: body.startingDate
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
  IncomeSource.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
});

module.exports = router;
