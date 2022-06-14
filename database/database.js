const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/travel', {
}).then(() => {
    console.log("Connection successfil")
}).catch((err) => {
    console.log(err)
})
