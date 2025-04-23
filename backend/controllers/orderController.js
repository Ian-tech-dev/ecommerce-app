
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
//Placing orders using COD method
const placeOrder = async (req,res)=>{

    try {

        const {userId,items,amount, address} = req.body
        address.phone = address.phone.replace('+','')
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }
        //create new order
        const newOrder = new orderModel(orderData)
        //save new order in database
        await newOrder.save()

        //clear cart data 
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

        
    } catch (error) {

        console.log(error);
        res.json({success:false,message:error.message})
        
        
    }

}

//Placing orders using Stripe method
const placeOrderMpesa = async (req,res)=>{

}

//Placing orders using Razorpay method
const placeOrderRazorpay = async (req,res)=>{

}



//All orders data for admin panel 
const allOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//User Order data for frontend 
const userOrders = async (req,res)=>{
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})//returns an array
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

//update order status from Admin panel
const updateStatus = async (req,res)=>{
    try {
        const {orderId,status} = req.body 
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {placeOrder, placeOrderMpesa,placeOrderRazorpay,allOrders,userOrders, updateStatus}

