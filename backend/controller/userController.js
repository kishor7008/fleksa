const { prependOnceListener } = require("../model/orederModel");
const User = require("../model/userModel");
const Order = require("../model/orederModel");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;
    let response = new User(req.body);
    await response.save();
    return res.status(200).json({ status: true, message: response });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        status: false,
        message: "Please enter your email and password",
      });
    }

    let response = await User.findOne({ email, password });
    if (response) {
      let token = jwt.sign({ id: response._id }, "abcd1234");
      return res.status(200).json({ status: true, message: token });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    let pendingCart = await Order.findOne({
      user: req.user._id,
      status: "Pending",
    });
    if (pendingCart) {
      let orderList = [
        ...pendingCart.dish,
        { orderItem: req.body.dishId, quantity: req.body.quantity },
      ];

      let response = await Order.updateOne(
        { _id: pendingCart._id },
        { $set: { dish: orderList } }
      );

      res.json(response);
    } else {
      console.log(req.user._id, req.params.dishId);
      let orderCreate = new Order({
        user: req.user._id,
        dish: [{ orderItem: req.body.dishId, quantity: req.body.quantity }],
      });
      await orderCreate.save();
      res.json(orderCreate);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getOrder = async (req, res) => {
  try {
    let response = await Order.find({ user: req.user._id,status:req.params.status}).populate("dish.orderItem")
    let result=[];
    for(let i=0;i<response.length;i++){
      result.push(response[i].dish)
    }
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

const completeOrder=async(req,res)=>{
  try {
    let response=await Order.updateOne({user:req.user._id,status:"Pending"},{$set:{status:"Complete"}})
    res.json({status:true,message:"Complete Order"})
  } catch (error) {
    return res.json(error);
  }
}

module.exports = { createUser, login, createOrder, getOrder,completeOrder };
