const mongoose = require('mongoose');
const WishSchema = new mongoose.Schema({
    productID: {type: mongoose.Schema.Types.ObjectId, required: true},
    userID: {type: mongoose.Schema.Types.ObjectId, required: true}

},
{timestamps: true, versionKey: false}
)

const WishItemModel = mongoose.model('wishes', WishSchema);
module.exports = WishItemModel;