/**
 * Schema for a lecture
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose'

export interface LectureDoc extends Document {
  classroom?: string
  class: string
  order: number
}

const lectureSchema = new mongoose.Schema({
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  order: { type: Number, required: true }
})

export default lectureSchema
