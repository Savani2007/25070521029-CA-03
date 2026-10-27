import PlantNote from '../models/PlantNote.js';
import Plant from '../models/Plant.js';

export const getNotes = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant || plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const notes = await PlantNote.find({ plantId: req.params.plantId }).sort({ isPinned: -1, createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant || plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const note = await PlantNote.create({
      userId: req.user.id,
      plantId: req.params.plantId,
      ...req.body
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await PlantNote.findById(req.params.id);
    if (!note || note.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const updated = await PlantNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await PlantNote.findById(req.params.id);
    if (!note || note.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await PlantNote.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
