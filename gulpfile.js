// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "src" folder, combines them with the Foundation for Apps assets, and outputs the finished files in the "public" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var gulp     = require('gulp');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var webpack = require('webpack-stream');

// Check for --production flag
var isProduction = !!(argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  assets: [
    './src/**/*.*',
    '!./src/templates/**/*.*',
    '!./src/{scss,js}/**/*.*' //do not compile JS
    // '!./src/assets/{scss}/**/*.*'
  ],
  // Sass will check these folders for files when you use @import.
  sass: [
    'src/scss',
    'node_modules/foundation-sites/scss'
  ],
  // These files include Foundation for Apps and its dependencies
  foundationJS: [

  ],
  // These files are for your app's JavaScript
  appJS: [
    'src/js/app.js'
  ]
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the public directory
gulp.task('clean', function(cb) {
  rimraf('./dist', cb);
});
// Cleans the public directory


gulp.task('webpack', function() {
  return gulp.src('src/js/app.js')
    .pipe(webpack(require("./webpack.config.js")(isProduction)))
    .pipe(gulp.dest('dist/js'));
});

// Copies everything in the src folder except templates, Sass //, and JS
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './src/'
  })
    .pipe(gulp.dest('./dist'))
  ;
});



// Compiles Sass
gulp.task('sass', function () {
  var minifyCss = $.if(isProduction, $.minifyCss());

  return gulp.src('src/scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sass,
      outputStyle: (isProduction ? 'compressed' : 'nested'),
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(minifyCss)
    .pipe(gulp.dest('./dist/css/'))
  ;
});


// Starts a test server, which you can view at http://localhost:8079
// gulp.task('server', ['build'], function() {
//   gulp.src('./build')
//     .pipe($.webserver({
//       port: 8008,
//       host: 'localhost',
//       fallback: 'index.html',
//       livereload: true,
//       open: true
//     }))
//   ;
// });

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
  sequence('clean', 'webpack', 'copy', 'sass',  cb);
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build'], function () {
  // Watch Sass
  gulp.watch(['./src/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript //Use Webpack instead!
  // gulp.watch(['./src/js/**/*', './js/**/*'], ['uglify:app']);
  // gulp.watch(['./src/js/**/*', './js/**/*'], ['copy']);
  gulp.watch(['./src/js/**/*', './js/**/*'], ['webpack']);

  // Watch static files
  gulp.watch(['./src/**/*.*', '!./src/templates/**/*.*', '!./src/{scss,js}/**/*.*'], ['copy']);


});
