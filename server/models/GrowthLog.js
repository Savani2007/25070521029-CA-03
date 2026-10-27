import mongoose from 'mongoose';

const growthLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plant',
      required: true
    },
    observationDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    heightCm: {
      type: Number,
      required: [true, 'Height is required'],
      min: 0
    },
    leafCount: {
      type: Number,
      min: 0
    },
    leafCondition: {
      type: String,
      required: [true, 'Leaf condition is required'],
      enum: ['Healthy', 'Yellowing', 'Wilting', 'Brown edges', 'Pest damage']
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

growthLogSchema.index({ plantId: 1, observationDate: -1 });

const GrowthLog = mongoose.model('GrowthLog', growthLogSchema);
export default GrowthLog;
