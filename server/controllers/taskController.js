import CareTask from '../models/CareTask.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await CareTask.find({ userId: req.user.id }).populate('plantId').sort({ dueDate: 1, priority: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await CareTask.create({
      userId: req.user.id,
      ...req.body
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await CareTask.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    if (req.body.status === 'Completed' && task.status !== 'Completed') {
      req.body.completedAt = new Date();
    }
    const updated = await CareTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await CareTask.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await CareTask.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
