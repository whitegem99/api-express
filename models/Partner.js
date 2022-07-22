const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Partner = new Schema({
    companyId: {
        type: String,
        auto: true,
        unique: true,
        required: true
    },
    companyName: {
        type: String,
        required: true,
    },
    baPartnerId: String,
    baAgentNo: String,
    contactPersonName: String,
    status: Number,
    active: {
        type: Boolean,
        default: 1
    }
}, {
    collection: 'partner',
    autoIndex: true,
    timestamps: { updatedAt: false }
});


module.exports = mongoose.model('Partner', Partner);