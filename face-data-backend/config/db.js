const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
// "mongodb+srv://gunjanverma0412:database123@facedata.n3eaewx.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;