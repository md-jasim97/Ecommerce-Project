const CartModel = require('../Models/CartModel');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');


const CartListService = async (req, res) => {
    
        const user_id = new ObjectId(req.headers.user_id);
        const matchStage = {$match: {userID: user_id}};


        const joinWithProduct = {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};
        const unwindProduct = {$unwind: "$product"};

        const joinWithBrand = {$lookup: {from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand"}};
        const unwindBrand = {$unwind: "$brand"};

        const joinWithCategory = {$lookup: {from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category"}};
        const unwindCategory = {$unwind: "$category"}

        const projectionStage = {$project: {"_id":0,"color":1, "qty":1, "size":1, "product.title":1, "product.image":1, "product.shortDes":1, "product.discountPrice":1,"product.price":1,"brand.brandName":1, "category.categoryName":1}};

    try {

        const data = await CartModel.aggregate([
            matchStage,
            joinWithProduct,
            unwindProduct,
            joinWithBrand,
            unwindBrand,
            joinWithCategory,
            unwindCategory,
            projectionStage
        ]);
        return {status: "Success", data: data};
        }
    catch (e) {
        return {status: "Failed", error: e.toString()};
    }
}



const manageCartListService = async ( req, res) => {
    try {
        const user_id = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID = user_id;

        await CartModel.create(reqBody);
        return {status: "Success", message: "Cart Added Successfully"}
    }
    catch (e) {
        return {status: "Failed", error: e.toString()};
    }
}


const RemoveCartListService = async (req, res) => {
    try {
        const user_id = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID = user_id;

        await CartModel.deleteOne(reqBody);
        return {status: "Success", message: "Cart Removed Successfully"}
    }
    catch (e) {
        return {status: "Failed", error: e.toString()};
    }
}




module.exports={
    CartListService,
    manageCartListService,
    RemoveCartListService
}