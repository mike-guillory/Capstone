const mongoose = require("mongoose");

const paymentSourceSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },
});

const PaymentSource = mongoose.model("PaymentSource", paymentSourceSchema);

module.exports = PaymentSource;
