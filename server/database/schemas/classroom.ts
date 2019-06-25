/**
 * Schema for a classroom
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose, { Document } from 'mongoose'
import { LectureDoc } from './lecture'
import { FloorDoc } from './floor'

export interface ClassroomDoc extends Document {
  floor?: string | FloorDoc
  number: string
  lectures: Array<string | LectureDoc>
}

const classroomSchema = new mongoose.Schema({
  floor: { type: mongoose.Schema.Types.ObjectId, ref: 'Floor' },
  number: { type: String, required: true },
  lectures: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true }
  ]
})

export default classroomSchema
