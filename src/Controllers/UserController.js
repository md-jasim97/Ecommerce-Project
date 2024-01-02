const { UserOTPService,VerifyOTPService, ProfileManggeService, ReadProfileService } = require("../services/UserService");

exports.UserOTP = async (req, res) => {
    let result = await UserOTPService(req)
    return res.status(200).json(result);
}

exports.VerifyOTP = async (req, res) => {
    let result = await VerifyOTPService(req)
    // return res.status(200).json(result);

    if (result["status"] === "Success") {
        let cookieOption = {expire:new Date(Date.now() + 24 * 6060 * 1000), httpOnly: false};

        // Set cookie and return response
        res.cookie("token", result["token"], cookieOption);
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
}

exports.UserLogout=async (req,res)=>{
    // let cookieOption={expires:new Date(Date.now()-24*6060*1000), httpOnly:false}
    // res.cookie("token", "",cookieOption)
    res.clearCookie("token")
    return res.status(200).json({status:"Success", message:"Logout Successfully"})
}


exports.CreateProfile = async (req, res) => {
    let result = await ProfileManggeService(req)
    return res.status(200).json(result);

}


exports.UpdateProfile = async (req, res) => {
    let result = await ProfileManggeService(req)
    return res.status(200).json(result);
    
}

exports.ReadProfile = async (req, res) => {
    let result = await ReadProfileService(req)
    return res.status(200).json(result);
    
}