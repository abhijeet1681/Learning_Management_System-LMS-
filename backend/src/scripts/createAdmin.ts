import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Define User model schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  phone: String,
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password function
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MongoDB URI not found in environment variables');
    }
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    
    // Create User model
    const User = mongoose.model('User', UserSchema);
    
    // Admin data - customize as needed
    const adminData = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'abhijeet@gmail.com',
      password: 'Admin@1234',
      phone: '1234567890',
      role: 'admin',
      isVerified: true,
      status: 'active'
    };
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists with email:', adminData.email);
      await mongoose.disconnect();
      return;
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(adminData.password);
    
    // Create the admin user
    const newAdmin = await User.create({
      ...adminData,
      password: hashedPassword
    });
    
    console.log('\nAdmin user created successfully:');
    console.log('------------------------------');
    console.log(`Name: ${newAdmin.firstName} ${newAdmin.lastName}`);
    console.log(`Email: ${newAdmin.email}`);
    console.log(`Password: ${adminData.password} (plain text, not stored)`);
    console.log(`Role: ${newAdmin.role}`);
    console.log('------------------------------');
    console.log('\nYou can now log in with these credentials in your admin panel.');
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

// Run the function
createAdminUser();