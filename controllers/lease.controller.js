import { Lease } from '../models/lease.model.js'

const create = (req, res) => {
  // create a save a new lease
  if(!req.body) {
    return res.status(400).send({message: "lease form cannot be empty"});
  }

  var lease = new Lease ({
              property_name: req.body.PropertyName,
              property_id: req.body.PropertyID,
              apartment_number: req.body.ApartmentNumber,
              unit_type: req.body.UnitType,
              tenant_email: req.body.TenantEmail,
              lease_from_date: req.body.LeaseFromDate,
              lease_to_date: req.body.LeaseToDate,
              monthly_rent: req.body.MonthlyRent,
            });

  // initiate lease upload on etherscan
  lease.save((err, data) =>  {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred"});
    } else {
      res.send(data);
    }
  });
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
