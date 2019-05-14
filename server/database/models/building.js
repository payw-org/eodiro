/**
 * Model for building
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import buildingSchema from '../schemas/building';

export default mongoose.model('Building', buildingSchema);
