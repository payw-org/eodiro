/**
 * Schema for course
 * 
 * @author H.Changjae
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  public_id: {type: String, required: true },
  land_list: [ { type: String, required: false } ]
});

export default courseSchema;
