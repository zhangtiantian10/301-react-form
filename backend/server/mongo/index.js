const mongoose = require('mongoose')

let mongoStatus = 'unconnected'
const start = function () {
    mongoose.Promise = global.Promise;

    const db = mongoose.connect('mongodb://localhost:27017/301_react_form');
}

function status () {
  return {
    mongodb: mongoStatus
  }
}

module.exports = {
  start: start,
  status: status
}
