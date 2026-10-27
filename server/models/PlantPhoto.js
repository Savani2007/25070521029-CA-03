import mongoose from 'mongoose';

const plantPhotoSchema = new mongoose.Schema(
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
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required']
    },
    caption: {
      type: String,
      trim: true,
      default: ''
    },
    takenAt: {
      type: Date,
      default: Date.now
    },
    tags: [{
      type: String,
      trim: true
    }],
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

plantPhotoSchema.index({ plantId: 1, takenAt: -1 });
plantPhotoSchema.index({ userId: 1 });

const PlantPhoto = mongoose.model('PlantPhoto', plantPhotoSchema);
export default PlantPhoto;
