const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductController');
const AuthVerificaton = require('../Middleware/AuthVerificaton');
const UserController = require('../Controllers/UserController');
const WishController = require("../Controllers/WishListController");
const CartListController = require('../Controllers/CartListController');

//================== Product Routes =================
router.get('/ProductBrandList', ProductController.ProductBrandList);
router.get('/ProductCategoryList', ProductController.ProductCategoryList);
router.get('/ProductSlidersList', ProductController.ProductSlidersList);
router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory);
router.get('/ProductListBySmilier/:CategoryID', ProductController.ProductListBySmilier);
router.get('/ProductListBykeyword/:Keyword', ProductController.ProductListBykeyword);
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark);
router.get('/ProductDetails/:ProductID', ProductController.ProductDetails);
router.get('/ProductReviewList/:ProductID', ProductController.ProductReviewList);


//===================== User Routes ==================
router.get("/userOTP/:email", UserController.UserOTP);
router.get("/verifyOTP/:email/:otp", UserController.VerifyOTP);
router.get('/UserLogout', AuthVerificaton,UserController.UserLogout);
router.post('/CreateProfile', AuthVerificaton, UserController.CreateProfile);
router.post('/UpdateProfile', AuthVerificaton, UserController.UpdateProfile);
router.get('/ReadProfile', AuthVerificaton, UserController.ReadProfile);


//========================== Wish Product Route =============================
router.post("/ManageWishList", AuthVerificaton, WishController.ManageWishList);
router.delete("RemoveWishList", AuthVerificaton, WishController.RemoveWishList);
router.get("/WishList", AuthVerificaton, WishController.WishList);



//======================= Cart List Routes ===========================
router.post('/ManageCartList', AuthVerificaton, CartListController.manageCartController);
router.post('/RemoveCartList', AuthVerificaton, CartListController.RemoveCartList);
router.get('/CartList', AuthVerificaton, CartListController.CartList);


module.exports = router;


