/**
 * Schema for a global name
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';

const globalNameSchema = new mongoose.Schema({
  kor: { type: String, required: true },
  eng: { type: String },
  cn: { type: String }
});

export default globalNameSchema;
