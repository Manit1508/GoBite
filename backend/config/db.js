const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>')) {
    console.warn('\n⚠️ [GoBite DB] MONGODB_URI is not configured with your MongoDB Atlas connection string.');
    console.warn('👉 Please create a .env file inside /backend with:');
    console.warn('   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/gobite?retryWrites=true&w=majority\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ [MongoDB Atlas Connected] Host: ${conn.connection.host} | DB: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ [MongoDB Atlas Connection Error] ${error.message}`);
    return false;
  }
};

const isDbConnected = () => mongoose.connection.readyState === 1;

module.exports = { connectDB, isDbConnected };
