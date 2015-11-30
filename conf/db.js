var dbUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/podcaster';
var mongoose = require('mongoose');
var connection = mongoose.connect(dbUrl);
// var connection = mongoose.createConnection(dbUrl);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
  console.info('Connected to database')
});
mongoose.set('debug', true);

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});