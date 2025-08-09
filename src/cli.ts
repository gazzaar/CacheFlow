#! /usr/bin/env node
import { Command } from 'commander';
import { startServer } from './index';
import { validateArguments } from './util/validateArgument';
import { clearCache } from './cacheManager';
const figlet = require('figlet');
console.log(figlet.textSync('CacheFlow'));
const program = new Command();

program
  .version('1.0.0')
  .description('A CLI Caching Proxy server')
  .option('-p, --port  <value>', 'Specify Port number')
  .option('-o, --origin <value>', 'Specify Origin server')
  .option('-c, --clear-cache ', 'Clear cache')
  .parse(process.argv);
const options = program.opts();

if (options.clearCache) {
  clearCache();
  console.log('clearning');
  process.exit();
} else {
  validateArguments(options.port, options.origin, startServer, program);
}
