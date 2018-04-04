import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var TenantSchema = new Schema({
  tenant_name: String,
  tenant_dob: Date,
  tenant_phone: String,
  tenant_email: String,
  income: Number,
  credit_score: Number,
}, {
  timestamps: true
});

var TenantModel = mongoose.model('TenantModel', TenantSchema)

export { TenantModel as Tenant };
