/**
 * Schema for class
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose, { Document } from 'mongoose'
import locationSchema, { LocationDoc } from './location'
import timeSchema, { TimeDoc } from './time'

export interface ClassDoc extends Document {
  class_id: string
  name: string
  instructor: string
  locations: LocationDoc[]
  times: TimeDoc[]
}

const classSchema = new mongoose.Schema({
  class_id: { type: String, required: true },
  name: { type: String, required: true },
  instructor: { type: String, default: '' },
  locations: [{ type: locationSchema, required: true }],
  times: [{ type: timeSchema, required: true }]
})

export default classSchema
