const mongoose = require("mongoose");

const incomeSourceSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },

  // frequency:{
  //   type: String,
  //   required: true,
  //   enum: ["Weekly", "Bi-Weekly", "Monthly"]
  // },

  // startingDate:{
  //   type: Date,
  //   required: true
  // }
});

const IncomeSource = mongoose.model("IncomeSource", incomeSourceSchema);

module.exports = IncomeSource;
