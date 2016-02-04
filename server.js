var argv = require('yargs').argv;
var paths = require('./package').config.paths;
var bs = require('browser-sync').create();
var exec = require('child_process').exec;

function run(command) {
  var proc = exec('npm run -s ' + command);
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  return proc;
}

bs.init({
  server: './public',
  files: paths.compiled,
  open: argv.open,
});

bs.watch(paths.css.glob, run.bind(null, 'css:dev'));
bs.watch(paths.html.glob, run.bind(null, 'html'));
