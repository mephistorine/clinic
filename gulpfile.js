var gulp        = require('gulp')
		pug         = require('gulp-pug'),
		styl        = require('gulp-stylus'),
		sourcemaps  = require('gulp-sourcemaps'),
		notify      = require('gulp-notify'),
		plumber     = require('gulp-plumber'),
		browserSync = require('browser-sync').create();

//Default
gulp.task('default', function(){
	console.log('Gulp works!');
});

//Pug
gulp.task('pug', function() {
	return gulp.src(['app/pug/*.pug', '!app/pug/_*.pug'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'Task : Pug',
				message: err.message
			}))
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('public/'))
		.pipe(browserSync.stream());
}); 

//Stylus
gulp.task('styl', function(){
	return gulp.src(['app/stylus/**/*.styl', '!app/stylus/**/_*.styl'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'Task : Stylus',
				message: err.message
			}))
		}))
		.pipe(sourcemaps.init())
		.pipe(styl())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/css/'))
		.pipe(browserSync.stream());
});

gulp.task('serve', ['pug', 'styl'], function() {

	browserSync.init({
		server: './public',
		ui: {
    	port: 8080
		}
	});

	gulp.watch('app/**/*.pug', ['pug']);
	gulp.watch('app/stylus/**/*.styl', ['styl']);
	gulp.watch(['public/*.html', 'public/js/*.js']).on('change', browserSync.reload);
});