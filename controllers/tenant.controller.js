import { Tenant } from '../models/tenant.model.js'

const create = (req, res) => {
  // create a save a new lease
  if(!req.body) {
    return res.status(400).send({message: "lease form cannot be empty"});
  }

  var tenant = new Tenant ({
    tenant_name: req.body.tenant_name,
    tenant_dob: req.body.tenant_dob,
    tenant_email: req.body.tenant_email,
    tenant_phone: req.body.tenant_phone,
    income: req.body.income,
    credit_score: req.body.credit_score 
  });

  // initiate lease upload on etherscan
  tenant.save((err, data) =>  {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred"});
    } else {
      res.send(data);
    }
  });
};


const findAll = (req, res) => {
  Tenant.find((err, tenants) => {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred"});
    } else {
      res.send(tenants);
    }
  });
  // retrieve and return all properties from database
};

const findByEmail = (req, res) => {
  Lease.findOne({ tenant_email: req.params.TenantEmail }, (err, tenant) => {
      if(err) {
        console.log(err);
        if(err.kind === 'ObjectId') {
          return res.status(404).send({message: "Tenant not found with id " +  req.params.TenantEmail});                
        }
        return res.status(500).send({message: "Error retrieving Tenant with id " + req.params.TenantEmail});
      } 
      if(!Tenants) {
          return res.status(404).send({message: "Tenant not found with id " + req.params.TenantEmail});            
      }
      res.send(tenant);
  });
};

export { create, findAll, findByEmail }
