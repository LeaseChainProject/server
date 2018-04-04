import { Property } from '../models/property.model'
import { Unit } from '../models/unit.model'

const create = (req, res) => {
  // create a save a new property
  console.log(req.body);
  if(!req.body) {
    return res.status(400).send({message: "Property form cannot be empty"});
  }
  Property.create({
    property_name: req.body.property_name,
    address: req.body.address,
    zip_code: req.body.zipcode,
    num_units: req.body.num_units,
    property_id: req.body.property_id
  }, (err, data) =>  {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred"});
    } else {
      res.send(data);
    }
  });
  req.body.units.map(({ unit_type, apartment_number }) => {
    Unit.create({
      property_id: req.body.property_id,
      unit_type,
      apartment_number,
      unit_id: `${req.body.property_id}_${apartment_number}_${unit_type}`
    }, (err) => {console.log(err)})
  })
};

const findAll = (req, res) => {
  Property.find((err, properties) => {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred"});
    } else {
      res.send(properties);
    }
  });
  // retrieve and return all properties from database
};

const findOne = (req, res) => {
  Property.findOne({ property_id: req.params.PropertyID }, (err, property) => {
      if(err) {
        console.log(err);
        if(err.kind === 'ObjectId') {
          return res.status(404).send({message: "Property not found with id " + req.params.name});                
        }
        return res.status(500).send({message: "Error retrieving property with id " + req.params.name});
      } 
      if(!property) {
          return res.status(404).send({message: "Property not found with id " + req.params.name});            
      }
      res.send(property);
  });
};

export { create, findAll, findOne }
