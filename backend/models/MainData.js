import mongoose, { Schema } from 'mongoose';

const MainDataSchema = new Schema({
    name: String,
    text: String
});

let data = mongoose.model('data', MainDataSchema);

export default data;
