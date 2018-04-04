export default function(app) {
  var unit = require('../controllers/unit.controller.js')

  // Create a new property
  app.get('/units', unit.findAll)

}
