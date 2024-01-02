const UserModel = require('../Models/UserModel');
const EmailSender = require('../Utility/EmailHelper');
const ProfileModel = require('../Models/ProfileModel');
const {EncodeToken} = require('../Utility/TokenHelper');
// const Randomstring = require('randomstring');



// User Otp Sender 
const UserOTPService = async (req, res) => {
    try {

        let email = req.params.email; 
        let code = Math.floor(100000 + Math.random() * 900000);
        // let otp = Randomstring.generate({length:6, charset:'numeric'});

        let Emailtext = `Your Verification OTP is ${code}`;
        let Emailsubject = "OTP Verification";

        await EmailSender(email, Emailtext, Emailsubject);

        await UserModel.updateOne({email:email}, {$set: {otp:code}}, {upsert:true});
        return {status: "Success", message: "6-Digit OTP has been Sent"}
        
    } catch (e) {
        return {status: "Fail", Error: e.toString()}
    }
}


// User Otp Veryfication and Login
const VerifyOTPService = async (req, res) => {

    try {
        let email = req.params.email;
        let otp = req.params.otp;


        let user = await UserModel.find({email:email, otp:otp}).count("total");

        if (user===1) {

            // user ID read
            let user_id = await UserModel.find({email:email, otp:otp}).select("_id");

            // User Token Create
            let token = EncodeToken(email, user_id[0]._id);
            

            // OTP code update to 0
            await UserModel.updateOne({email:email}, {$set: {otp:"0"}});

            return {status: "Success", message: "OTP Verified", token: token}
        } else {
            return {status: "Fail", message: "Invalid OTP"}
        }
    } catch (e) {
        return {status: "Fail", Error: e.toString()}
    }


}



// Profile Create or Update
const ProfileManggeService = async (req, res) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body
        reqBody.user_id = user_id;
        await ProfileModel.updateOne({userID:user_id}, {$set: reqBody}, {upsert:true});
        return {status: "Success", message: "Profile Managed Successfully"}
        
    } catch (error) {
        return {status: "Fail", Error: error.toString()}
    }


}


const ReadProfileService = async (req, res) => {
    try {
        let user_id = req.headers.user_id;
        let profile = await ProfileModel.find({userID:user_id});
        return {status: "Success", profile: profile}
    } catch (error) {
        return {status: "Fail", Error: error.toString()}
    }

    
}



module.exports = {
    UserOTPService,
    VerifyOTPService,
    ProfileManggeService,
    ReadProfileService
}