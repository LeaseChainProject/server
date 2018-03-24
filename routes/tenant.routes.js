export default function(app) {
  var tenant = require('../controllers/tenant.controller.js')

  // Create a new property
  app.post('/add-tenant', tenant.create)

  // Retrieve all properties
  app.get('/tenants', tenant.findAll);

  // retrieve a single property with propertyName
  app.get('/lease/:TenantEmail', tenant.findByEmail);

}
