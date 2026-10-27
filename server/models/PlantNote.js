import mongoose from 'mongoose';

const plantNoteSchema = new mongoose.Schema(
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
    title: {
      type: String,
      trim: true,
      default: ''
    },
    content: {
      type: String,
      required: [true, 'Note content is required']
    },
    category: {
      type: String,
      enum: ['Observation', 'Issue', 'Success', 'Reminder', 'General'],
      default: 'General'
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    tags: [{
      type: String,
      trim: true
    }]
  },
  {
    timestamps: true
  }
);

plantNoteSchema.index({ plantId: 1, createdAt: -1 });
plantNoteSchema.index({ userId: 1, isPinned: -1 });

const PlantNote = mongoose.model('PlantNote', plantNoteSchema);
export default PlantNote;
