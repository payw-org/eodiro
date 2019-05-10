/**
 * Schema for a building
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import floorSchema from './floor';
import globalNameSchema from './global_name';

const buildingSchema = new mongoose.Schema({
  number: { type: String, required: true },
  name: { type: globalNameSchema, required: true },
  floors: [ { type: floorSchema, required: true } ]
});

export default buildingSchema;
