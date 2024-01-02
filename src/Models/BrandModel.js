const mongoose = require('mongoose');
const BrandSchema = new mongoose.Schema({
    brandName: {type: String, required: true, unique: true},
    brandImg: {type: String, required: true}
},
{timestamps: true, versionKey: false}
)

const BrandModel = mongoose.model('brand', BrandSchema);
module.exports = BrandModel;