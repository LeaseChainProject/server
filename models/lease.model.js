import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var LeaseSchema = new Schema({
  tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' },
  unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
  lease_from_date: { type: Date, default: Date.now },
  lease_to_date: Date,
  monthly_rent: Number,
  etherscan_link: String,
  status: { type: String }
}, {
  timestamps: true
});

var LeaseModel = mongoose.model('LeaseModel', LeaseSchema)

export { LeaseModel as Lease };

/*
Creation code
LeaseModel.create(
  { property_id: "",
    apartment_number: "",
    unit_type: "",
    tenant_email: "",
    deposit_amount: "",
    lease_from_date: "",
    lease_to_date: "",
    monthly_rent: "",
    etherscan_url: ""
  }, function(err, lease_instance) {
    if (err) return err;
    // deploy lease contract
    deploy_lease_contract((etherscan_url) => {
      lease_instance.etherscan_url = etherscan_url
      lease_instance.save(function (err) {
        if (err) return err;
        console.log("saved with etherscan_url: " + etherscan_url)
      })
    })
  })
*/