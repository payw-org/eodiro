/**
 * Model for lecture
 *
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose'
import lectureSchema from '../schemas/lecture'

export default mongoose.model('Lecture', lectureSchema)
