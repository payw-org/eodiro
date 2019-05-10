/**
 * Schema for a classroom
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import lectureSchema from './lecture';

const classroomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  lectures: [ { type: lectureSchema, required: true } ]
});

export default classroomSchema;
