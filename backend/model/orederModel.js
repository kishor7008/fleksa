const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dish:[
      { orderItem: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Dish"
         },
         quantity:{
            type:String
         }}
    ],
    status:{
        type:String,
        default:"Pending"
    }
})

const Order=mongoose.model("Order",orderSchema)
module.exports=Order