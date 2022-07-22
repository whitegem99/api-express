// routing
// ./routes/user.js)/... ==> /user/...

const fs = require('fs');
const path = require('path');
var express = require('express');

var app = express();
const baseUrl = '/'

fs.readdir(__dirname + '/routes', (err, files) => {
    files.forEach(file => {
        // console.log(path.basename(file, '.js'))
        let route_name = path.basename(file, '.js')
        if (route_name == 'index') route_name = ''
        app.use(baseUrl + route_name, require('./routes/' + route_name))
    })
})

module.exports = app;