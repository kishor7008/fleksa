const mongoose = require("mongoose");
const dishSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  cook_time:{
    type:String
  },
  category:{
    type:String,
    default:"Dessert"
  }
});

const Dish=mongoose.model("Dish",dishSchema)

module.exports=Dish