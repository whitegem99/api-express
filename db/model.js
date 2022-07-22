const {v4: uuidv4} = require('uuid')

class Model {
    items = []
    get length(){
        return this.items.length
    }
    get all() {
        return this.items
    }
    findById(id) {
        return this.items.find(ee => ee.id == id)
    }    
    create(data) {
        const id = uuidv4()
        this.items.push({...data, id})
        return this.findById(id)
    }
    findByIdAndUpdate(id, data) {
        const _index = this.items.findIndex(ee => ee.id == id)
        console.log(_index, "...Index");
        if (_index != -1) {
            this.items[_index] = { ...this.items[_index], ...data }
        }
        return this.items[_index]
    }
    findByIdAndDelete(id) {
        let _index = this.items.findIndex(ee => ee.id == id)
        if (_index != -1) {
            this.items.splice(_index, 1)
            return true
        }
        else false
    }    
}
module.exports = Model