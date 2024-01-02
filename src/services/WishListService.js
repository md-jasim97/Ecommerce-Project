const {WishModel} = require("../Models/WishModel");
const {mongoose} = require("mongoose");
const ObjectID = mongoose.Types.ObjectId


const WishListService = async (req, res)=>{

}


const ManageWishListService = async (req, res) => {
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;

        await WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true})
        return {status:"Success",message:"WishList Managed Successfully"}
    }
    catch (e) {
        return {status:"fail", error:e.toString()}
    }

}


const RemovedWishListService = async (req, res) => {
    try {
        const user_id = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID=user_id;

        await WishModel.deleteOne(reqBody);
        return {status: "Success", message: "WishList Removed Successfully"}
    } catch (error) {
        return {status:"Failed", error:error.toString()}
    }

}



module.exports={
    WishListService,
    ManageWishListService,
    RemovedWishListService
}