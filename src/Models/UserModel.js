const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email: {type: String, required: true, lowercase: true},
    otp: {type: String, required: true}

},
{timestamps: true, versionKey: false}
)

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;