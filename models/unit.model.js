import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var UnitSchema = new Schema({
  property_id: String,
  apartment_number: Number,
  unit_type: String,
  unit_id: String,
})

var UnitModel = mongoose.model('UnitModel', UnitSchema)

export { UnitModel as Unit }