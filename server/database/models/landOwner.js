/**
 * Model for clientLand
 * 
 * @author H.Changjae
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import landOwnerSchema from 'Database/schemas/landOwner';

export default mongoose.model('LandOwner', landOwnerSchema);
