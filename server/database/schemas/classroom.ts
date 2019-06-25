/**
 * Schema for a classroom
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose, { Document } from 'mongoose'

export interface ClassroomDoc extends Document {
  floor?: string
  number: string
  lectures: Array<string>
}

const classroomSchema = new mongoose.Schema({
  floor: { type: mongoose.Schema.Types.ObjectId, ref: 'Floor' },
  number: { type: String, required: true },
  lectures: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true }
  ]
})

export default classroomSchema
