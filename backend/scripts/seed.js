require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const Outlet = require('../models/Outlet');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const User = require('../models/User');
const {
  initialOutlets,
  initialMenuItems,
  initialOrders,
  initialUsers
} = require('../data/seedData');

const seedDatabase = async () => {
  console.log('🌱 Starting GoBite Database Seeder for MongoDB Atlas...');

  const isConnected = await connectDB();
  if (!isConnected) {
    console.error('❌ Could not connect to MongoDB Atlas. Ensure MONGODB_URI is provided in /backend/.env');
    process.exit(1);
  }

  try {
    console.log('🧹 Clearing existing collections...');
    await Promise.all([
      Outlet.deleteMany({}),
      MenuItem.deleteMany({}),
      Order.deleteMany({}),
      User.deleteMany({})
    ]);

    console.log('📦 Inserting campus food outlets...');
    const createdOutlets = await Outlet.insertMany(initialOutlets);
    console.log(`✅ Inserted ${createdOutlets.length} outlets.`);

    console.log('📦 Inserting menu items...');
    const createdMenuItems = await MenuItem.insertMany(initialMenuItems);
    console.log(`✅ Inserted ${createdMenuItems.length} menu items.`);

    console.log('📦 Inserting initial orders...');
    const createdOrders = await Order.insertMany(initialOrders);
    console.log(`✅ Inserted ${createdOrders.length} orders.`);

    console.log('📦 Inserting initial users...');
    const createdUsers = await User.insertMany(initialUsers);
    console.log(`✅ Inserted ${createdUsers.length} users.`);

    console.log('\n🎉 GoBite MongoDB Atlas seeding completed successfully!\n');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
