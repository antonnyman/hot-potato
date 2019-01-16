const program = require('commander');
const package = require('../package.json');
const server = require('./server.js');

program
  .version(package.version)
  .option('-p, --port [type]', 'Port')
  .option('-w, --watch', 'Watch')
  .parse(process.argv);

server(program.port, program.watch);
