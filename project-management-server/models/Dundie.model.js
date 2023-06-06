const { Schema, model } = require("mongoose");

const dundieSchema = new Schema(
  {
    name: String,
    description: String,
    paid: Number, 
    currency: String, 
  }
);

const Dundie = model("Dundie", dundieSchema);

module.exports = Dundie;
