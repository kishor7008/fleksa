const express=require("express")
const route=express.Router()
const {protect}=require("../middleware/auth")
const {createUser,login,createOrder,getOrder,completeOrder}=require("../controller/userController")
const {createDish,dishByCategory}=require('../controller/dishController')
route.post("/register",createUser)
route.post("/login",login)
route.put("/create/order",protect,createOrder)
route.get("/get/order/:status",protect,getOrder)
route.put("/complete/order",protect,completeOrder)



route.post('/dish/create',createDish)
route.get('/dish/category/:category',dishByCategory)


module.exports=route