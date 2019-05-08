/**
 * Model for course
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import courseSchema from 'Database/schemas/course';

export default mongoose.model('Course', courseSchema);
