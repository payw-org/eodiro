/**
 * Schema for a floor
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import classroomSchema from './classroom';

const floorSchema = new mongoose.Schema({
  number: { type: String, required: true },
  classrooms: [ { type: classroomSchema, required: true } ]
});

export default floorSchema;
