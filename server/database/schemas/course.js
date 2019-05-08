/**
 * Schema for course
 * 
 * @author H.Chihoon
 * @copyright 2019 Payw
 */

import mongoose from 'mongoose';
import locationSchema from './location';
import timeSchema from './time';

const courseSchema = new mongoose.Schema({
    number: {type: String, required: true },
    class: { type: String, required: true },
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    locations: [ { type: locationSchema, required: true } ],
    times: [ { type: timeSchema, required: true } ]
});

courseSchema.index({ number: 1, class: 1 }, { unique: true });

export default courseSchema;
