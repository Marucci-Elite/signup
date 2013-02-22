var deployd = require('deployd');

var options = {
  port: 3000,
  db: {
    host:'localhost',
    name:'marucci',
    port:27017
  },
  env:'development'
};

var dpd = deployd(options);

dpd.listen();