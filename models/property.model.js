import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
  property_name: String,
  address: String,
  zip_code: String,
  num_units: Number,
  property_id: String
}, {
  timestamps: true
});

var PropertyModel = mongoose.model('PropertyModel', PropertySchema)

export { PropertyModel as Property};
