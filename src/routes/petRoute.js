import { Router } from "express";
import { petModel } from "../models/petsSchema.js";

export const pet=Router();

pet.get('/pets/:id', async (req, res) => {
    const { id } = req.params;
    const { search, sortBy } = req.query;
  
    const query = { _id: id };
  
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
  
    try {
      let pets;
  
      if (sortBy) {
        pets = await petModel.find(query).sort({ [sortBy]: 1 }).exec();
      } else {
        pets = await petModel.find(query).exec();
      }
  
      if (!pets.length) {
        return res.status(404).json({ message: 'No pets found' });
      }
  
      res.json(pets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  pet.post('/pets/add', async (req, res) => {
    const newPet = req.body;
    try {
      const pet = await petModel.create(newPet);
      res.status(201).json(pet);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  pet.put('/pets/update/:id', async (req, res) => {
    const { id } = req.params;
    const updatedPet = req.body;
    try {
      const pet = await petModel.findByIdAndUpdate(id, updatedPet, { new: true });
      if (!pet) {
        return res.status(404).json({ message: 'Pet not found' });
      }
      res.json(pet);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  pet.delete('/pets/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const pet = await petModel.findByIdAndDelete(id);
      if (!pet) {
        return res.status(404).json({ message: 'Pet not found' });
      }
      res.json({ message: 'Pet deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });