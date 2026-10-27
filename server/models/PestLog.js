import mongoose from 'mongoose';

const pestLogSchema = new mongoose.Schema(
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
    pestName: {
      type: String,
      required: [true, 'Pest or issue name is required'],
      trim: true
    },
    issueType: {
      type: String,
      enum: ['Pest', 'Disease', 'Fungus', 'Nutrient Deficiency', 'Environmental Stress', 'Other'],
      default: 'Pest'
    },
    severity: {
      type: String,
      enum: ['Low', 'Moderate', 'High', 'Critical'],
      default: 'Low'
    },
    symptoms: {
      type: String,
      trim: true
    },
    treatment: {
      type: String,
      trim: true
    },
    treatmentAppliedAt: {
      type: Date,
      default: Date.now
    },
    resolved: {
      type: Boolean,
      default: false
    },
    resolvedAt: {
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

pestLogSchema.index({ plantId: 1, createdAt: -1 });
pestLogSchema.index({ userId: 1, resolved: 1 });

const PestLog = mongoose.model('PestLog', pestLogSchema);
export default PestLog;
