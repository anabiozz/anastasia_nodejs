const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const bs = require('browser-sync').create();

gulp.task('browserSync', function() {
	bs.init({
		ui: {
	       port: 3046
        },
		port: 3045,
		proxy: "localhost:9000"
	})
});

gulp.task('babel', function() {
	return gulp.src('frontend/js/es6/*.js')
	.pipe(babel())
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(gulp.dest('frontend/js'))
});

gulp.task('sass', function () {
	return gulp.src('frontend/sass/styles.scss')
	.pipe(sass())
	.pipe(gulp.dest('frontend/stylesheets'))
	.pipe(bs.reload({stream: true}))
});

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('frontend/stylesheets/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('frontend/stylesheets'));
});

gulp.task('watch', ['browserSync', 'sass', 'babel'], function() {
	gulp.watch('frontend/sass/*.scss', ['sass']);
	gulp.watch('frontend/views/index.pug').on('change', bs.reload);
	gulp.watch('frontend/js/es6/*.js', ['babel']);
});
