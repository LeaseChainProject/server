import { Property } from '../models/property.model.js'

const create = (req, res) => {
  // create a save a new property
  if(!req.body) {
    return res.status(400).send({message: "Property form cannot be empty"});
  }

  var property= new Property ({
              property_name: req.body.PropertyName,
              address: req.body.Address,
              zip_code: req.body.Zipcode,
              units: req.body.NumberofUnits
            });
  property.save((err, data) =>  {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred"});
    } else {
      res.send(data);
    }
  });
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
          return res.status(404).send({message: "Property not found with id " + req.params.PropertyName});                
        }
        return res.status(500).send({message: "Error retrieving property with id " + req.params.PropertyName});
      } 
      if(!property) {
          return res.status(404).send({message: "Property not found with id " + req.params.PropertyName});            
      }

      res.send(property);

  });
};

export { create, findAll, findOne }
