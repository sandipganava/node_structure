const { connectDatabase } = require('../config/database');
const User = require('../models/user.model');
const admin = {
    name: 'Sandip',
    email: 'sandipganava2357@gmail.com',
    password: '!Sandip2505',
};

async function seedDatabase() {
    try {
        await connectDatabase();

        const newUser = new User(admin);

        const result = await newUser.save();
        console.log(`Inserted document with _id: ${result._id}`);
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();
