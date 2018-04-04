export default function(app) {
  var property = require('../controllers/property.controller.js')

  // Create a new property
  app.post('/add-property', property.create)

  // Retrieve all properties
  app.get('/properties', property.findAll);

  // retrieve a single property with propertyName
  app.get('/properties/:PropertyID', property.findOne);

}
