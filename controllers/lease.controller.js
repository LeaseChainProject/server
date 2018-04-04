import { Lease } from '../models/lease.model.js'
import { CreateContract } from '../contract'

const create = (req, res) => {
  // create a save a new lease
  if(!req.body) {
    return res.status(400).send({message: "lease form cannot be empty"});
  }

  Lease.create({
    lease_start_date: req.body.lease_start_date,
    lease_end_date: req.body.lease_end_date,
    monthly_rent: req.body.monthly_rent,
    property_id: req.body.property_id,
    apartment_number: req.body.apartment_number,
    unit_type: req.body.unit_type,
    tenant_email: req.body.tenant_email,
  }, (err, lease) => {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred"});
    } else {
      res.send(lease);
    }
    CreateContract(req.app.get('web3'), lease)
  })
};


const findAll = (req, res) => {
  Lease.find((err, leases) => {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred"});
    } else {
      res.send(leases);
    }
  });
  // retrieve and return all properties from database
};

const findByUnitID = (req, res) => {
  [property_id, apartment_number, unit_type] = req.params.unitID.trim().split("_");
  Lease.find({ property_id: property_id, apartment_number: apartment_number }, (err, leases) => {
      if(err) {
        console.log(err);
        if(err.kind === 'ObjectId') {
          return res.status(404).send({message: "Lease not found with id " +  req.params.unitID});                
        }
        return res.status(500).send({message: "Error retrieving lease with id " + req.params.unitID});
      } 
      if(!leases) {
          return res.status(404).send({message: "Lease not found with id " + req.params.unitID});            
      }
      res.send(leases);

  });
};

export { create, findAll, findByUnitID }
