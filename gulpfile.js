var gulp = require('gulp');
var browserify = require('browserify');
var jadeify = require('jadeify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var stylus = require('gulp-stylus');
var concat = require('gulp-concat-css');
var nib = require('nib');

var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('build', ['css', 'js'])

gulp.task('js', function() {
  return browserify({
    entries: './dev/app.js', //punto de entrada js
    transform: [ babelify, jadeify] //transformaciones
  })
  .bundle()
  .pipe(source('app.js')) // archivo destino
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./public/js/')) // en dónde va a estar el archivo destino
});

gulp.task('css', function() {
  return gulp.src('dev/stylus/estilos.styl') // entry point de styl
    .pipe(stylus({ use: nib() })) //inicializo stylus con nib como plugin
    .pipe(concat('estilos.css'))// archivo destino
    .pipe(minify())
    .pipe(gulp.dest('./public/css'))
})