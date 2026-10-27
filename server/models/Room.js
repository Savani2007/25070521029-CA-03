import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Room name is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    icon: {
      type: String,
      default: '🏠'
    },
    color: {
      type: String,
      default: '#A8BFA1'
    },
    lightLevel: {
      type: String,
      enum: ['Low', 'Medium', 'Bright', 'Direct Sun', 'Unknown'],
      default: 'Unknown'
    },
    humidity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Unknown'],
      default: 'Unknown'
    },
    temperature: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

roomSchema.index({ userId: 1 });

const Room = mongoose.model('Room', roomSchema);
export default Room;
