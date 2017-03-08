import mongoose, { Schema } from 'mongoose';

const aboutSchema = new Schema({
    name: String,
    text: String
});

let data = mongoose.model('data', aboutSchema);

export default data;
