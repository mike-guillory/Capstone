const mongoose = require("mongoose");

const paymentSourceSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },

  type:{
    type: String,
    required: true
  }
});
