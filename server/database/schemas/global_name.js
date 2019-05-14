/**
 * Schema for a global name
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';

const globalNameSchema = new mongoose.Schema({
  ko: { type: String, required: true },
  en: { type: String },
  zh: { type: String },
  fr: { type: String }
});

export default globalNameSchema;
