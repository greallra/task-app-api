const mongoose = require('mongoose');

mongoose.connect(process.env.MLAB_URL,{
 useNewUrlParser: true,
 useCreateIndex: true
})


