const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile SASS
gulp.task('sass', function(){
    return gulp.src(['node_modules/materialize-css/sass/materialize.scss', './app/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

// Move js file to app/js folder
gulp.task('js', function(){
    return gulp.src(['node_modules/materialize-css/dist/js/materialize.min.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('./app/js'))
    .pipe(browserSync.stream());
});

// Watch SASS
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: "./app"
    });

    gulp.watch(['node_modules/materialize-css/sass/materialize.scss', './app/scss/*.scss'], ['sass']);
    gulp.watch("./app/*.html").on('change', browserSync.reload);
});

// Move fontawesome to fonts app/fonts folder
gulp.task('fa', function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./app/fonts'));
});

// Move materialize font to app/fonts flder
gulp.task('fonts', function(){
    return gulp.src('node_modules/materialize-css/dist/fonts/roboto/*')
    .pipe(gulp.dest('./app/fonts/roboto'));
});

// Move fontawesome css to app/css folder
gulp.task('font-css', function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('./app/css'));
});

gulp.task('default', ['js', 'serve', 'fonts', 'fa', 'font-css']);