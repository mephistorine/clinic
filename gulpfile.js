var gulp       = require('gulp'),
	pug          = require('gulp-pug'),
	styl         = require('gulp-stylus'),
	sourcemaps   = require('gulp-sourcemaps'),
	notify       = require('gulp-notify'),
	plumber      = require('gulp-plumber'),
	browserSync  = require('browser-sync').create(),
	smartgrid  	 = require('smart-grid'),
	combineMq    = require('gulp-combine-mq'),
	uglyfly      = require('gulp-uglyfly'),
	autoprefixer = require('gulp-autoprefixer');
	//csscomb 		 = require('gulp-csscomb');

var src  = 'app/',
		dist = 'public/';
//Default
gulp.task('default', function(){
	console.log('Gulp works!');
});

//Pug
gulp.task('pug', function() {
	return gulp.src([src + 'pug/*.pug','!' + src + 'pug/_*.pug'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'Task : Pug',
				message: err.message
			}))
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(dist))
		.pipe(browserSync.stream());
}); 

//Stylus
gulp.task('styl', function(){
	return gulp.src([src + 'stylus/**/*.styl','!' + src + 'stylus/**/_*.styl'])
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'Task : Stylus',
				message: err.message
			}))
		}))
		.pipe(sourcemaps.init())
		.pipe(styl())
		.pipe(combineMq({
			beautify: true}
		))
		.pipe(autoprefixer({
			 browsers: ['last 10 versions']
		}))
		//.pipe(csscomb())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dist +'css/'))
		.pipe(browserSync.stream());
});

//JS compress
gulp.task('compress', function() {
  return gulp.src(src + 'js/**/*.js')
    .pipe(uglyfly())
    .pipe(gulp.dest(dist + 'js/'));
});

gulp.task('serve', ['pug', 'styl'], function() {

	browserSync.init({
		server: './public',
		ui: {
    	port: 8080
		}
	});

	gulp.watch(src + '**/*.pug', ['pug']);
	gulp.watch(src + 'stylus/**/*.styl', ['styl']);
	gulp.watch(src + 'js/**/*.js', ['compress']);
	gulp.watch([dist +'*.html', dist +'js/**/*.js']).on('change', browserSync.reload);
});