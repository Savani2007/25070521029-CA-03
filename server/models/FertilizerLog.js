import mongoose from 'mongoose';

const fertilizerLogSchema = new mongoose.Schema(
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
    fertilizerName: {
      type: String,
      required: [true, 'Fertilizer name is required'],
      trim: true
    },
    fertilizerType: {
      type: String,
      enum: ['Liquid', 'Granular', 'Organic', 'Slow Release', 'Foliar', 'Other'],
      default: 'Liquid'
    },
    dosage: {
      type: String,
      trim: true
    },
    amount: {
      type: String,
      trim: true
    },
    appliedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    nextDueDate: {
      type: Date
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

fertilizerLogSchema.index({ plantId: 1, appliedAt: -1 });
fertilizerLogSchema.index({ userId: 1 });

const FertilizerLog = mongoose.model('FertilizerLog', fertilizerLogSchema);
export default FertilizerLog;
