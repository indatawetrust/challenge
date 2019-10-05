const mongoose = require('mongoose')

const Task = require('./Task')

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};

const models = {Task};

module.exports = {connectDb, models};
