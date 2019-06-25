/**
 * Model for university
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose'
import universitySchema from '../schemas/university'

export default mongoose.model('University', universitySchema)
