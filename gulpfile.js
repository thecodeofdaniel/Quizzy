const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const path = require('path');
const PWD  = process.env.INIT_CWD;

const srcFiles = path.join(PWD, 'sass/**/*.scss');
const dstFiles = path.join(PWD, 'css');

function buildStyles() {
  return src(srcFiles)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest(dstFiles));
}

function watchTask() {
  watch([srcFiles], buildStyles);
}

exports.default = series(buildStyles, watchTask);
