/**
 * Schema for a university
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import globalNameSchema from './global_name';

const universitySchema = new mongoose.Schema({
  name: { type: globalNameSchema, required: true },
  campus: { type: globalNameSchema },
  vendor: { type: String, required: true, unique: true },
  buildings: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true } ],
  classes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true } ]
});

export default universitySchema;
