const mongoose = require('mongoose');
const models = require('../models');
const up = async () => {
    const total = await models.Partner.countDocuments()
    if (!total) {
        for (let i = 0; i < 16; i++) {
            const _id = new mongoose.mongo.ObjectId()
            await models.Partner.create(
                {
                    _id,
                    companyId: _id,
                    companyName: "CompanyName" + i,
                    baPartnerId: Math.floor((Math.random() * 100000) + 1),
                    baAgentNo: Math.floor((Math.random() * 1000000) + 1),
                    contactPersonName: "Michle-" + i,
                    status: Math.round(Math.random() * 3),
                    active: true
                });
        }
    }
}

module.exports = up