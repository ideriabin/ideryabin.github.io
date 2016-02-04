var argv = require('yargs').argv;
var paths = require('./package').config.paths;
var bs = require('browser-sync').create();
var exec = require('child_process').exec;

function run(command) {
  return exec('npm run -s ' + command).stdout.pipe(process.stdout);
}

bs.init({
  server: './public',
  files: paths.compiled,
  open: argv.open,
});

run('images');
run('icons');
bs.watch(paths.css.glob, run.bind(null, 'css:dev'));
bs.watch(paths.html.glob, run.bind(null, 'html'));
