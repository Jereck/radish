module.exports = function(app) {
  const pork = require("../controllers/porkController");

  app.route('/')
    .get(pork.home);

  app.route('/turnip')
    .post(pork.create_a_pork);
}