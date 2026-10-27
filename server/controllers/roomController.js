import Room from '../models/Room.js';
import Plant from '../models/Plant.js';

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  try {
    const room = await Room.create({
      userId: req.user.id,
      ...req.body
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoomWithPlants = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room || room.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const plants = await Plant.find({ roomId: req.params.id });
    res.status(200).json({ room, plants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room || room.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const updated = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room || room.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await Plant.updateMany({ roomId: req.params.id }, { $unset: { roomId: 1 } });
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
