var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

var reload = browserSync.reload;

var paths = {
  styles: {
    src: 'sass/sweetbridge.scss',
    srcWatch: '/scss/**/*.scss',
    dest: 'public/stylesheets'
  },
  scripts: {
    src: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/swiper/dist/js/swiper.js',
      'js/main.js'
    ],
    srcWatch: '/js/**/*.js',
    dest: 'public/javascripts'
  },
  images: {
    dest: 'public/images'
  }
};

// Compile SASS
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
  cascade: false
};

gulp.task('styles', function () {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(reload({ stream: true }));
});

gulp.task('styles-prod', function () {
  return gulp
    .src(paths.styles.src)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(paths.styles.dest));
});

// gulp.task('browser-sync', function() {
//   browserSync({
//     proxy: "localhost:3000"
//   });
// });

// Compile JavaScript
gulp.task('scripts', function() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('site.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('scripts-prod', function() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat('site.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
});

// Watch SASS and scripts change
gulp.task('watch', function () {
  browserSync.init({
    // ghostMode: { scroll: false },
    // notify: false,
    // open: false,
    proxy: 'localhost:3000'//,
    // port: 3000
    // files: [
    //   paths.styles.dest + '/**/*.css',
    //   paths.scripts.dest + '/**/*.js',
    //   paths.images.dest
    // ]
  });
  gulp.watch(paths.styles.srcWatch, ['styles'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch(paths.scripts.srcWatch, ['scripts'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['styles', 'scripts', 'watch' /*, possible other tasks... */]);

gulp.task('prod', ['styles-prod', 'scripts-prod']);
