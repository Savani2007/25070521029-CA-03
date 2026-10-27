import mongoose from 'mongoose';

const careTaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plant'
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true
    },
    taskType: {
      type: String,
      enum: ['Water', 'Fertilize', 'Prune', 'Repot', 'Inspect', 'Rotate', 'Mist', 'Other'],
      default: 'Other'
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required']
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending'
    },
    completedAt: {
      type: Date
    },
    reminderEnabled: {
      type: Boolean,
      default: true
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

careTaskSchema.index({ userId: 1, dueDate: 1, status: 1 });
careTaskSchema.index({ plantId: 1 });

const CareTask = mongoose.model('CareTask', careTaskSchema);
export default CareTask;
