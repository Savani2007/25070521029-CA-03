import mongoose from 'mongoose';

const wateringLogSchema = new mongoose.Schema(
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
    wateredAt: {
      type: Date,
      required: true,
      default: Date.now
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

wateringLogSchema.index({ plantId: 1, wateredAt: -1 });

const WateringLog = mongoose.model('WateringLog', wateringLogSchema);
export default WateringLog;
