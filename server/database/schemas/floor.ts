/**
 * Schema for a floor
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose, { Document } from 'mongoose'

export interface FloorDoc extends Document {
  building?: string
  number: string
  classrooms: Array<string>
}

const floorSchema = new mongoose.Schema({
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  number: { type: String, required: true },
  classrooms: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true }
  ]
})

export default floorSchema
