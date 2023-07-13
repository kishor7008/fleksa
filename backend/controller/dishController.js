const Dish=require("../model/dishModel")


const createDish=async(req,res)=>{
    let {data}=req.body
    for(let i=0;i<data.length;i++){
        let response=new Dish({
            name:data[i].name,
            price:data[i].price,
            description:data[i].description,
            image:data[i].image,
            cook_time:data[i].cook_time,
        })
        await response.save()
    }
    res.json("dish create")
}


const dishByCategory=async(req,res)=>
{
    try {
        let response=await Dish.find({category:req.params.category})
        res.json({status:true,message:response})
    } catch (error) {
        
    }
}

module.exports={createDish,dishByCategory}