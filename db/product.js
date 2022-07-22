const Model = require('./model')
var product = new Model()
const count = 20

for (let i = 0; i < count; i++) {
    product.create(
        {
            company: "News" + i,
            cate_number: Math.floor((Math.random()*100000)+1),
            verifier_id: Math.floor((Math.random()*1000000)+1),
            contact_person: "Michle-" + i,
            status: Math.round(Math.random()*3),
            active: true
        }
    )
}

module.exports = product