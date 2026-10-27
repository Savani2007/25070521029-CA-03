import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required']
    },
    avatar: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      trim: true
    },
    themePreference: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    notificationsEnabled: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);
export default User;
