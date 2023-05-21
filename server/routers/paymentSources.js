const {Router, response} = require("express");
const {request} = require("http");
const PaymentSource = require("../models/PaymentSource");
const router = Router();

// CREATE
router.post("/", (request, response) => {

  const newPaymentSource = new PaymentSource(request.body);

  newPaymentSource.save((error, record) => {
    if (error?.name === "ValidationError") return response.status(400).json(error.errors);
    if (error) return response.status(500).json(error.errors);

    response.json(record);
  });
});

// READ ALL
router.get("/", (request, response) => {
  PaymentSource.find({}, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
});

// READ ONE
router.get("/:id", (request, response) => {
  PaymentSource.findById(request.params.id, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
})

// UPDATE
router.put("/:id", (request, response) => {

  const body = request.body;

  PaymentSource.findByIdAndUpdate(request.params.id,
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
  PaymentSource.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if(error) return response.status(500).json(error.errors);
    response.json(record);
  });
});

module.exports = router;
