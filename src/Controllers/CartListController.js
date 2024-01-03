const { CartListService, manageCartListService, RemoveCartListService } = require("../services/CartListService");


exports.CartList= async (req, res) => {
    let data = await CartListService(req);
    return res.status(200).json(data);
}

    exports.manageCartController= async (req, res) => {
        let data = await manageCartListService(req);
        return res.status(200).json(data);
    }


    exports.RemoveCartList= async (req, res) => {
        let data = await RemoveCartListService(req);
        return res.status(200).json(data);
    }