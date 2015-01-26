var gulp = require('gulp'),
    // sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    prefix = require('gulp-autoprefixer'),
    // maps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    config = require('./package.json');

var path = {
    styles: config.folders.public + '/' + config.folders.styles,
    scss_short: config.folders.styles_scss,
    css_min_short: config.folders.styles_min,
    scss: config.folders.public + '/' + config.folders.styles + '/' + config.folders.styles_scss,
    css_min: config.folders.public + '/' + config.folders.styles + '/' + config.folders.styles_min
};

console.log(path);

// gulp.task('sass', function() {
// gulp.src( path.scss + '**/*.scss')
//   .pipe(maps.init())
//     .pipe(sass({
//      outputStyle: 'compressed' ,
//      onSuccess: function(css){
//         console.log("SUCCESS:", css);
//      },
//      onError: fnunction(err){
//         console.error("ERROR:".err);
//      }
//  }))
//       .pipe(maps.write())
//       .pipe(gulp.dest( path.styles ))
// });

gulp.task('compass', function() {
    gulp.src(path.scss + '/*.scss')
        .pipe(compass({
            // project: 'public/stylesheets/',
            css: path.styles,
            sass: path.scss,
            sourcemap: true,
            time: true,
            debug: true,
            logging: true,
            // config_file: './config.rb',
            // require: ['susy', 'modular-scale'],
            // image: 'app/assets/images',
            style: 'compressed',
        }))
        .on('error', function (error) {
            // Would like to catch the error here
            console.log(error);
            this.emit('end');
        })
        .pipe(minifyCSS({
            debug:true,
        }))
        .pipe(gulp.dest(path.css_min));
});

gulp.task('autoprefix', function() {
    gulp.src(path.css)
        .pipe(prefix('last 5 versions', '> 1%', 'ie8'))
        .pipe(gulp.dest(path.css));
});
