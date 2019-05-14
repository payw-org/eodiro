/**
 * Model for clientLand
 * 
 * @author H.Changjae
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import clientLandSchema from 'Database/schemas/clientLand';

export default mongoose.model('ClientLand', clientLandSchema);
