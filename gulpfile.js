'use strict'

let gulp = require('gulp')
let browserSync = require('browser-sync')
let sass = require('gulp-sass')
let child = require('child_process')
let gutil = require('gulp-util')
let ghPages = require('gulp-gh-pages')

gulp.task('default', ['copy', 'jekyll', 'browser-sync', 'watch'], function () {
})

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['styles'])
})

gulp.task('copy', ['copy-fonts', 'copy-jquery', 'copy-bootstrap', 'copy-tether', 'copy-vue'], function () {

})

gulp.task('copy-fonts', function () {
  gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./site/fonts'));
});

gulp.task('copy-jquery', function () {
  gulp.src('./node_modules/jquery/dist/jquery.min.*')
    .pipe(gulp.dest('./site/js'));
});

gulp.task('copy-bootstrap', function () {
  gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./site/js'));
});

gulp.task('copy-tether', function () {
  gulp.src('./node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest('./site/js'));
});

gulp.task('copy-vue', function () {
  gulp.src('./node_modules/vue/dist/vue.min.js')
    .pipe(gulp.dest('./site/js'));
});

gulp.task('jekyll', function () {
  let jekyll = child.spawn('jekyll', ['serve',
    '--watch',
    '--drafts',
    '--config=_config_dev.yml'
  ])

  let jekyllLogger = function (buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function (message) {
        gutil.log('Jekyll: ' + message)
      })
  }

  jekyll.stdout.on('data', jekyllLogger)
  jekyll.stderr.on('data', jekyllLogger)
})

gulp.task('jekyll-deploy', function () {
  let jekyll = child.spawn('jekyll', ['build',
    '--config=_config.yml'
  ])

  let jekyllLogger = function (buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function (message) {
        gutil.log('Jekyll: ' + message)
      })
  }

  jekyll.stdout.on('data', jekyllLogger)
  jekyll.stderr.on('data', jekyllLogger)
})

gulp.task('styles', function () {
  gulp.src('scss/css-layout.scss')
    .pipe(sass({
      includePaths: ['./node_modules/']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./site/css/'))

  gulp.src('scss/layout.scss')
    .pipe(sass({
      includePaths: ['./node_modules/']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./site/css/'))
})

gulp.task('browser-sync', function () {
  browserSync.init(null, {
    files: ['_site/**/*.*'],
    port: 7000,
    server: {
      baseDir: '_site'
    }
  })
})

gulp.task('deploy', [], function () {
  return gulp.src('./_site/**/*')
    .pipe(ghPages())
})
