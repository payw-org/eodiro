/**
 * Model for class
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import classSchema from '../schemas/class';

export default mongoose.model('Class', classSchema);
