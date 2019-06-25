/**
 * Schema for room location
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose, { Document } from 'mongoose'

export interface LocationDoc extends Document {
  building: string
  room: string
}

const locationSchema = new mongoose.Schema({
  building: { type: String, required: true },
  room: { type: String, required: true }
})

export default locationSchema
