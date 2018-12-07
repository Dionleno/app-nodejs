//separar o arquivo de configuração 
var app = require('./config/Server')
var { normalizePort, onError, onListening } = require('./config/Utils');
var db = require('./models');

//porta que sera executada
var port = normalizePort(process.env.port || 3000);

db.sequelize.sync().then(() => {
  app.listen(port);
  app.on('Error', onError(app));
  app.on('Listening', onListening(app));
})
