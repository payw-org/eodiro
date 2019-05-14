/**
 * Schema for a floor
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';

const floorSchema = new mongoose.Schema({
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  number: { type: String, required: true },
  classrooms: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true } ]
});

export default floorSchema;
