var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var addStream = require('add-stream');
var angularTemplateCache = require('gulp-angular-templatecache');
var template = require('gulp-template');

// this is unique identifier used to namespace integration packages
var unique = 'acme';
var params = {
    'identifier': unique,
    'templateModule': unique + 'Templates'
};

gulp.task('default', ['watch']);

function prepareTemplates() {
    return gulp.src('src/templates/**/*.html')
        .pipe(template(params))
        .pipe(angularTemplateCache({
            'root': unique,
            'module': params.templateModule
        }));
}

gulp.task('build', function () {
    return gulp
        .src('src/**/*.js')
        .pipe(template(params))
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(sourcemaps.init())
        .pipe(concat('integration.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
    ;
});

gulp.task('watch', function () {
    return gulp.watch(
        'src/**/*.js',
        ['jshint', 'build']
    );
});

gulp.task('jshint', function () {
    return gulp
        .src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
    ;
});
