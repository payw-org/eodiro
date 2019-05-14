/**
 * Model for classroom
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import classroomSchema from '../schemas/classroom';

export default mongoose.model('Classroom', classroomSchema);
