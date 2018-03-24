export default function(app) {
  var lease = require('../controllers/lease.controller.js')

  // Create a new property
  app.post('/add-lease', lease.create)

  // Retrieve all properties
  app.get('/leases', lease.findAll);

  // retrieve a single property with propertyName
  app.get('/lease/:unitID', lease.findByUnitID);

}
