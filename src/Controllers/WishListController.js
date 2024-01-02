const {WishListService, ManageWishListService, RemovedWishListService} = require("../services/WishListService");


exports.WishList = async(req, res) => {
    const result = await WishListService(req);
    return res.status(200).json(result)
}



exports.ManageWishList = async(req, res) => {
    const result = await ManageWishListService(req);
    return res.status(200).json(result)
}



exports.RemoveWishList = async(req, res) => {
    const result = await RemovedWishListService(req);
    return res.status(200).json(result)
}