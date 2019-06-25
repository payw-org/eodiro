/**
 * Model for floor
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose'
import floorSchema from '../schemas/floor'

export default mongoose.model('Floor', floorSchema)
