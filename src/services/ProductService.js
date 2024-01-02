const BrandModel = require('../Models/BrandModel');
const CategoryModel = require('../Models/CategoryModel');
const ProductSliderModel = require('../Models/ProductSliderModel');
const ProductDetailModel = require('../Models/ProductDetailModel');
const ProductModel = require('../Models/ProductModel');
const ReviewModel = require('../Models/ReviewModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;





const BrandListService = async () => {
    try {
        const data = await BrandModel.find();
        return {status: "Success", data: data}
    } catch (error) {
        return {status: "Failed", data: error.toString()}
    }
    
}

const CategoryListService = async () => {
    try {
        const data = await CategoryModel.find();
        return {status: "Success", data: data}
    } catch (error) {
        return {status: "Failed", data: error.toString()}
    }
}

const SlidersListService = async () => {
    try {
        const data = await ProductSliderModel.find();
        return {status: "Success", data: data}
    } catch (error) {
        return {status: "Failed", data: error.toString()}
    }
}














const ListByBrandService = async (req) => {

    try {

        let BrandID = new ObjectId(req.params.BrandID);
        let MatchStage = {$match: {brandID: BrandID}}
        let joinWithBrand = {$lookup: {from: "brands",localField: "brandID",foreignField: "_id",as: "brand"}};
        let joinWithCategory = {$lookup: {from: "categories",localField: "categoryID",foreignField: "_id",as: "category"}}
        let UnwindBrand = {$unwind: "$brand"}
        let UnwindCategory = {$unwind: "$category"}
        let ProjectionStage = {$project: {"_id": 0,"categoryID": 0,"brandID": 0, "brand._id": 0, "category._id": 0}}


        const data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrand,
            joinWithCategory,
            UnwindBrand,
            UnwindCategory,
            ProjectionStage
        ])

        return {status: "Success", data: data}
        
    } catch (error) {
        return {status: "Failed", data: error.toString()}
    }
    
}

const ListByCategoryService = async (req) => {

    try {

        let CategoryID = new ObjectId(req.params.CategoryID);
        let MatchStage = {$match: {categoryID: CategoryID}}
        let joinWithBrand = {$lookup: {from: "brands",localField: "brandID",foreignField: "_id",as: "brand"}};
        let joinWithCategory = {$lookup: {from: "categories",localField: "categoryID",foreignField: "_id",as: "category"}}
        let UnwindBrand = {$unwind: "$brand"}
        let UnwindCategory = {$unwind: "$category"}
        let ProjectionStage = {$project: {"_id": 0,"categoryID": 0,"brandID": 0, "brand._id": 0, "category._id": 0}}


        const data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrand,
            joinWithCategory,
            UnwindBrand,
            UnwindCategory,
            ProjectionStage
        ])

        return {status: "Success", data: data}
        
    } catch (error) {
        return {status: "Failed", data: error.toString()}
    }
    
}

const ListByRemarkService = async (req) => {
    try {

        let Remark = req.params.Remark;
        let MatchStage = {$match: {remark: Remark}}
        let joinWithBrand = {$lookup: {from: "brands",localField: "brandID",foreignField: "_id",as: "brand"}};
        let joinWithCategory = {$lookup: {from: "categories",localField: "categoryID",foreignField: "_id",as: "category"}}
        let UnwindBrand = {$unwind: "$brand"}
        let UnwindCategory = {$unwind: "$category"}
        let ProjectionStage = {$project: {"_id": 0,"categoryID": 0,"brandID": 0, "brand._id": 0, "category._id": 0}}


        const data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrand,
            joinWithCategory,
            UnwindBrand,
            UnwindCategory,
            ProjectionStage
        ])

        return {status: "Success", data: data}
        
    } catch (error) {
        return {status: "Failed", data: error.toString()}
    }
}










const ListBySmilierService = async (req) => {
    try {

        const CategoryID = new ObjectId(req.params.CategoryID);
        const MatchStage = {$match: {categoryID: CategoryID}};
        const LimitStage = {$limit: 20};
        const joinWithBrand = {$lookup: {from: "brands",localField: "brandID",foreignField: "_id",as: "brand"}};
        const joinWithCategory = {$lookup:{from : "categories",localField: "categoryID",foreignField: "_id",as: "category"}};
        const UnwindBrand = {$unwind: "$brand"};
        const UnwindCatagory = {$unwind: "$category"};
    



        const data = await ProductModel.aggregate([
            MatchStage,
            LimitStage,
            joinWithBrand,
            joinWithCategory,
            UnwindBrand,
            UnwindCatagory
        ]);

        return {status: "Success", data: data}
        
    } catch (error) {
        return {status: "Failed", data: error.toString()}
    }
    
}





const DetailsService = async (req) => {
    try {
        const ProductID = new ObjectId(req.params.ProductID);
        const MatchStage = {$match: {_id: ProductID}};



        const joinWithBrandStage = {$lookup: {from: "brands",localField: "brandID",foreignField: "_id",as: "brand"}};
        const joinWithCategoryStage = {$lookup: {from: "categories",localField: "categoryID",foreignField: "_id",as: "category"}};
        const joinWithDetailsStage = {$lookup: {from: "productdetails",localField: "_id",foreignField: "productID",as: "details"}};
        

        const UnwindBrandStage = {$unwind: "$brand"};
        const UnwindCategoryStage = {$unwind: "$category"};
        const UnwindDetailsStage = {$unwind: "$details"};


        const ProjectionStage = {$project: {"categoryID": 0,"brandID": 0, "brand._id": 0, "category._id": 0, "details._id": 0}}


        const data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            joinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage
        ])

        return {status: "Success", data: data}
    } catch (error) {
        return {status: "Failed", data: error.toString()}
    }
}

const ListBykeywordService = async (req) => {
    try {
        const SearchRegex = {$regex:req.params.Keyword, "$options": "i"};
        const SearchParams = [{title: SearchRegex}, {shortDes: SearchRegex}];
        const SearchQuery = {$or: SearchParams};



        const MatchStage = {$match:SearchQuery};
        const joinWithBrand = {$lookup: {from: "brands",localField: "brandID",foreignField: "_id",as: "brand"}};
        const joinWithCategory = {$lookup: {from: "categories",localField: "categoryID",foreignField: "_id",as: "category"}};

        const UnwindBrand = {$unwind: "$brand"};
        const UnwindCategory = {$unwind: "$category"};

        const ProjectionStage = {$project: {"categoryID": 0,"brandID": 0, "brand._id": 0, "category._id": 0}}

        const data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrand,
            joinWithCategory,
            UnwindBrand,
            UnwindCategory,
            ProjectionStage
        ])

        return {status: "Success", data: data}
        
    } catch (error) {
        return {status: "Failed", data: error.toString()}
    }
}





const ReviewListService = async (req) => {
    // try {
    //     let user_id = req.headers.user_id;
    //     let productID = req.params.ProductID;

    //     let MatchStage = {$match: {userID: user_id}};
    //     const joinWithBrand = {$lookup: {from: "brands",localField: "brandID",foreignField: "_id",as: "brand"}};
    //     const joinWithCategory = {$lookup: {from: "categories",localField: "categoryID",foreignField: "_id",as: "category"}};

    //     const UnwindBrand = {$unwind: "$brand"};
    //     const UnwindCategory = {$unwind: "$category"};

    //     const ProjectionStage = {$project: {"userID": 1,"productID": 1, "des": 1, "rating": 1}}


    //     const data = await ReviewModel.aggregate([
    //         MatchStage,
    //         joinWithBrand,
    //         joinWithCategory,
    //         UnwindBrand,
    //         UnwindCategory,
    //         ProjectionStage
    //     ])

    //     return {status: "Success", data: data}
        
    // } catch (error) {
    //     return {status: "Failed", data: error.toString()}
    // }
    
}



module.exports = {
    BrandListService,
    CategoryListService,
    SlidersListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySmilierService,
    ListBykeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService
}