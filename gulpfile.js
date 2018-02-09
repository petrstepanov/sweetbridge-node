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
    srcProcess: 'sass/sweetbridge.scss',
    src: 'sass/**/*.scss',
    dest: 'public/stylesheets'
  },
  scripts: {
    src: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/swiper/dist/js/swiper.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'js/**/*.js'
    ],
    dest: 'public/javascripts'
  },
  images: {
    src: 'public/images/**/*.*',
    dest: 'public/images'
  },
  views: {
    src: 'views/**/*.ejs',
    dest: 'views'
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
    .src(paths.styles.srcProcess)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('styles-prod', function () {
  return gulp
    .src(paths.styles.srcProcess)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(paths.styles.dest));
});

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
  browserSync({
    // ghostMode: { scroll: false },
    // notify: false,
    // open: false,
    proxy: 'localhost:3000',//,
    // port: 3000
    files: [
      paths.styles.dest + '/**/*.css',
      paths.scripts.dest + '/**/*.js',
      paths.images.dest + '/**/*.*',
      paths.views.dest + '/*.ejs'
    ]
  });
  gulp.watch(paths.styles.src, ['styles'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch(paths.scripts.src, ['scripts'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('prod', ['styles-prod', 'scripts-prod']);

gulp.task('default', ['styles', 'scripts', 'watch' /*, possible other tasks... */]);
