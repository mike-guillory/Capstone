const mongoose = require("mongoose");

const payDaySchema = new mongoose.Schema({

  paySource:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },
  date:{
    type: Date,
    required: true
  }
});

const PayDay = mongoose.model("PayDate", payDaySchema);

module.exports = PayDay;
