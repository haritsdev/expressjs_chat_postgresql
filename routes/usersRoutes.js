const UsersController = require('../controllers/usersController');

module.exports = (app) => {
  // GET of DATA
  app.get('/api/users/getAll', UsersController.getAll);
  //POST data USERS
  app.post('/api/users/create', UsersController.register);
  app.post('/api/users/login', UsersController.login);
};
