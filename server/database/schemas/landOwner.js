/**
 * Schema for course
 * 
 * @author H.Changjae
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';

const landOwnerSchema = new mongoose.Schema({
  public_id: {type: String, required: true },
  owner_id: { type: String, required: true }
});

export default landOwnerSchema;
