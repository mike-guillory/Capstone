const mongoose = require("mongoose");

const incomeSource = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  amount:{
    type: isInteger,
    required: true
  },

  frequency:{
    type: String,
    required: true
  },

  startingDate:{
    type: Date,
    required: true
  }
});
