/**
 * Schema for a university
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import buildingSchema from './building';
import globalNameSchema from './global_name';

const universitySchema = new mongoose.Schema({
  name: { type: globalNameSchema, required: true },
  campus: { type: globalNameSchema },
  vendor: { type: String, required: true, unique: true },
  buildings: [ { type: buildingSchema, required: true } ]
});

export default universitySchema;
