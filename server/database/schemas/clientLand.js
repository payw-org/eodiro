/**
 * Schema for course
 * 
 * @author H.Changjae
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';

const clientLandSchema = new mongoose.Schema({
  public_id: {type: String, required: true },
  lands: [ { type: String, required: false } ]
});

export default clientLandSchema;
