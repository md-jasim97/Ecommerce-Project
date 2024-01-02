const {BrandListService, CategoryListService, SlidersListService, ListByBrandService, ListByCategoryService, ListBySmilierService, ListBykeywordService, ListByRemarkService, DetailsService, ReviewListService} = require('../services/ProductService')



exports.ProductBrandList = async (req, res) => {
    const result = await BrandListService();
    return res.status(200).json(result);
    
}

exports.ProductCategoryList = async (req, res) => {
    const result = await CategoryListService();
    return res.status(200).json(result);
}


exports.ProductSlidersList = async (req, res) => {
    const result = await SlidersListService();
    return res.status(200).json(result);
}









exports.ProductListByBrand = async (req, res) => {
    const result = await ListByBrandService(req);
    return res.status(200).json(result);
}

exports.ProductListByCategory = async (req, res) => {
    const result = await ListByCategoryService(req);
    return res.status(200).json(result);
    
}


exports.ProductListBySmilier = async (req, res) => {
    const result = await ListBySmilierService(req);
    return res.status(200).json(result);
    
}


exports.ProductListBykeyword = async (req, res) => {
    const result = await ListBykeywordService(req);
    return res.status(200).json(result);
}


exports.ProductListByRemark = async (req, res) => {
    const result = await ListByRemarkService(req);
    return res.status(200).json(result);
}


exports.ProductDetails = async (req, res) => {
    const result = await DetailsService(req);
    return res.status(200).json(result);
}


exports.ProductReviewList = async (req, res) => {
    let result = await ReviewListService(req);
    return res.status(200).json(result);
    
}


exports.CreateProductReview = async (req, res) => {
    let result = await ReviewListService(req);
    return res.status(200).json(result);
    
}


