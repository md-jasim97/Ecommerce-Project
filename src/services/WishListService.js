const {WishModel} = require("../Models/WishModel");
const {mongoose} = require("mongoose");
const ObjectID = mongoose.Types.ObjectId


const WishListService = async (req, res)=>{
    const user_id = new ObjectID(req.headers.user_id);
    const matchStage = {$match: {userID: user_id}};

    const joinWithProduct = {$lookup: {from: "products",localField: "productID",foreignField: "_id",as: "product"}};
    const unwindProduct = {$unwind: "$product"};

    const joinWithBrand = {$lookup: {from: "brands",localField: "product.brandID",foreignField: "_id",as: "brand"}};
    const unwindBrand = {$unwind: "$brand"};

    const joinWithCategory = {$lookup: {from: "categories",localField: "product.categoryID",foreignField: "_id",as: "category"}};
    const unwindCategory = {$unwind: "$category"};

    const projectionStage = {$project: {"_id": 0,"categoryID": 0,"brandID": 0, "brand._id": 0, "category._id": 0}};


    try {
        const data = await WishModel.aggregate([
            matchStage,
            joinWithProduct,
            unwindProduct,
            joinWithBrand,
            unwindBrand,
            joinWithCategory,
            unwindCategory,
            projectionStage
        ])
    
        return {status:"Success",data:data}
    } catch (error) {
        return {status:"Failed",error:error.toString()}
        
    }


}


const ManageWishListService = async (req, res) => {
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;

        await WishModel.create(reqBody)
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