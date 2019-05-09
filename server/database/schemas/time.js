/**
 * Schema for lecture time
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';

const timeSchema = new mongoose.Schema({
  day: { type: String, required: true },      // ex. MON
  start: { type: String, required: true },    // ex. 3:30pm -> 1530
  end: { type: String, required: true }
});

export default timeSchema;
