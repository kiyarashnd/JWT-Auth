// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
