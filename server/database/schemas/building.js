/**
 * Schema for a building
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import globalNameSchema from './global_name';

const buildingSchema = new mongoose.Schema({
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },
  number: { type: String, required: true },
  name: { type: globalNameSchema, required: true },
  floors: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Floor', required: true } ]
});

export default buildingSchema;
