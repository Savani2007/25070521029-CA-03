import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    },
    name: {
      type: String,
      required: [true, 'Plant name is required'],
      trim: true
    },
    species: {
      type: String,
      required: [true, 'Species is required'],
      trim: true
    },
    imageUrl: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    dateAdded: {
      type: Date,
      default: Date.now
    },
    boughtDate: {
      type: Date
    },
    price: {
      type: Number,
      min: 0
    },
    potSize: {
      type: String,
      trim: true
    },
    soilType: {
      type: String,
      trim: true
    },
    lastWatered: {
      type: Date,
      default: Date.now
    },
    lastFertilized: {
      type: Date
    },
    nextFertilizeDate: {
      type: Date
    },
    wateringIntervalDays: {
      type: Number,
      required: [true, 'Watering interval is required'],
      min: 1
    },
    nextWateringDate: {
      type: Date,
      required: true
    },
    sunlightRequirement: {
      type: String,
      required: [true, 'Sunlight requirement is required'],
      enum: ['Low', 'Medium', 'Bright Indirect', 'Full Sun']
    },
    currentHeight: {
      type: Number,
      default: 0
    },
    healthScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 70
    },
    status: {
      type: String,
      enum: ['Active', 'Dormant', 'Needs Attention', 'Sick', 'Deceased'],
      default: 'Active'
    },
    tags: [{
      type: String,
      trim: true
    }],
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

plantSchema.index({ userId: 1 });
plantSchema.index({ roomId: 1 });
plantSchema.index({ status: 1 });

const Plant = mongoose.model('Plant', plantSchema);
export default Plant;
