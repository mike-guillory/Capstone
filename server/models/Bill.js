const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },

  amount:{
    type: Double,
    required: true,
  },

  total:{
    type: Double,
  },

  dueDate:{
    type: Date,
    required: true
  },

  paidFrom:{
    type: String,
    required: true
  },

  adjustedPayDate:{
    type: Date,
  }
});
