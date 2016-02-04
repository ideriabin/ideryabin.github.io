import { argv } from 'yargs';
import pkg from './package';
import browserSync from 'browser-sync';
import { exec } from 'child_process';

const paths = pkg.config.paths;
const bs = browserSync.create();

function run(command) {
  const proc = exec('npm run -s ' + command);
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  return proc;
}

bs.watch(paths.css.glob, { ignoreInitial: true }, () => run('css:dev'));
bs.watch(paths.html.glob, { ignoreInitial: true }, () => run('html'));
bs.watch(paths.images.in, { ignoreInitial: true }, () => run('images'));
bs.watch(paths.icons.in, { ignoreInitial: true }, () => run('icons'));

bs.init({
  server: './public',
  files: paths.compiled,
  open: argv.open,
});
