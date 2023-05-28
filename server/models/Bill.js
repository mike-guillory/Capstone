const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },

  amount:{
    type: Number,
    required: true,
  },

  total:{
    type: Number,
  },

  dueDate:{
    type: Number,
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

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
