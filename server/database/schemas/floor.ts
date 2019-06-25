/**
 * Schema for a floor
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose, { Document } from 'mongoose'
import { BuildingDoc } from './building'
import { ClassroomDoc } from './classroom'

export interface FloorDoc extends Document {
  building?: string | BuildingDoc
  number: string
  classrooms: Array<string | ClassroomDoc>
}

const floorSchema = new mongoose.Schema({
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  number: { type: String, required: true },
  classrooms: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true }
  ]
})

export default floorSchema
