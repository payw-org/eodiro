/**
 * Schema for a building
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose'
import globalNameSchema, { GlobalNameDoc } from './global_name'

export interface BuildingDoc extends Document {
  university?: string
  number: string
  name: GlobalNameDoc
  floors: Array<string>
}

const buildingSchema = new mongoose.Schema({
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },
  number: { type: String, required: true },
  name: { type: globalNameSchema, required: true },
  floors: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Floor', required: true }
  ]
})

export default buildingSchema
