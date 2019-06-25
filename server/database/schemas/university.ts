/**
 * Schema for a university
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose, { Document } from 'mongoose'
import globalNameSchema, { GlobalNameDoc } from './global_name'
import { BuildingDoc } from './building'
import { ClassDoc } from './class'

export interface UniversityDoc extends Document {
  name: GlobalNameDoc
  campus?: GlobalNameDoc
  vendor: string
  buildings: Array<string | BuildingDoc>
  classes: Array<string | ClassDoc>
}

const universitySchema = new mongoose.Schema({
  name: { type: globalNameSchema, required: true },
  campus: { type: globalNameSchema },
  vendor: { type: String, required: true, unique: true },
  buildings: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true }
  ],
  classes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }
  ]
})

export default universitySchema
