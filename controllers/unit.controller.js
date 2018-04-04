import { Unit } from '../models/unit.model'

const findAll = (req, res) => {
  Unit.find((err, units) => {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred"});
    } else {
      res.send(units);
    }
  });
  // retrieve and return all properties from database
};

export { findAll }