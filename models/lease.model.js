import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var LeaseSchema = new Schema({
  property_name: String,
  property_id: String,
  apartment_number: Number,
  unit_type: String,
  tenant_email: String,
  lease_from_date: { type: Date, default: Date.now },
  lease_to_date: Date,
  monthly_rent: Number,
  etherscan_link: String,
  stat: { type: String, default: "active" }
}, {
  timestamps: true
});

var LeaseModel = mongoose.model('LeaseModel', LeaseSchema);

export { LeaseModel as Lease };
