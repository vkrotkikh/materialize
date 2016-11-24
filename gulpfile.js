// Подключаем необходимые плагины
var gulp =			require('gulp'),
	buffer =		require('vinyl-buffer'),
	autoprefixer =	require('gulp-autoprefixer'),
	sass =			require('gulp-sass'),
	notify =		require('gulp-notify'),
	jade =			require('gulp-jade'),
	data =			require('gulp-data'),
	fs =			require('fs'),
	sourcemaps =	require('gulp-sourcemaps'),
	prettify =		require('gulp-prettify'),
	gutil =			require('gulp-util'),
	watch =			require('gulp-watch'),
	imagemin =		require('gulp-imagemin'),
	newer =			require('gulp-newer'),
	browserSync =	require('browser-sync'),
	zip =			require('gulp-zip'),
	spritesmith =	require('gulp.spritesmith'),
	svgSprite =		require('gulp-svg-sprite'),
	cache =			require('gulp-cache'),
	merge =			require('merge-stream'),
	uncss =			require('gulp-uncss'),

	projNameForZip =	'currProj';

// Определяем переменные для хранения путей к местоположению файлов
var path = {
	// js: ['./src/js/*.js', '!' + './src/js/*.min.js'],
	img: ['./src/img/**/*.*'],
	imgSprite: ['./src/img/sprite/*'],
	html: ['./dist/*.html'],
	htmlsrc: ['./src/html/**/*.*'],
	scss: ['./src/scss/**/**/*.scss'],
	jade: ['./src/jade/**/*.jade', '!' + './src/jade/**/_*.jade']
};

// Определяем задачу для CSS
gulp.task('sass', function() {
	gulp.src('./src/scss/all.scss')
		.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: [
					"last 2 version", 
					"> 1%",
					"ie 11"
				],
				cascade: true
			}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream())
		.pipe(notify('Succes SCSS!'));
});

// Uncss
// gulp.task('uncss', function () {
//     return gulp.src('./dist/css/all.css')
//         .pipe(uncss({
//             html: ['index.html', 'posts/**/*.html', 'http://example.com']
//         }))
//         .pipe(gulp.dest('./dist/css/'));
// });

// Определяем задачу для js
gulp.task('js', function() {
	gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./dist/js/'))
		.pipe(browserSync.stream())
		.pipe(notify('Succes JS'))
});

// Определяем задачу для HTML
/*gulp.task('jade', function() {
	var json = JSON.parse(fs.readFileSync('./src/jade/data.json'));

	return gulp.src(path.jade)
	.pipe(data( function(file) {
		return json;
	}))
	.pipe(jade())
	.on('error', function(err){
		gutil.log(gutil.colors.red(err))
	})
	.pipe(prettify({
		indent_size: 1,
		indent_inner_html: true,
		indent_char: '\t',
		preserve_newlines: true,
		max_preserve_newlines: 0,
		unformatted: true,
		end_with_newline: false
	}))
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream())
	.pipe(notify('Succes Jade!'));
}); */

gulp.task('htmlcopy', function() {
	return gulp.src(path.htmlsrc)
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream());
})

// Картинки
gulp.task('imagemin', function(){
	gulp.src(path.img)
		.pipe(newer('dist/img'))
		.pipe(imagemin({
			interlaced: true
		}))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('sprite', function () {
	var spriteData = gulp.src(path.imgSprite).pipe(spritesmith({
		imgName: '../img/sprite.png',
		cssName: '_sprite.scss'
	}));

	var imgStream = spriteData.img
		.pipe(buffer())
		.pipe(gulp.dest('dist/img/'))
		.pipe(notify('Succes spriteImage'));

	var cssStream = spriteData.css
		.pipe(gulp.dest('src/scss/'))
		.pipe(notify('Succes spriteSCSS'));

	return merge(imgStream, cssStream);
});

// SVG


// Копируем шрифты
gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
})

// Определяем задачу watch
gulp.task('watcher', function() {
	gulp.watch(path.scss, ['sass']);
	// gulp.watch('./src/jade/**/**/*.jade', ['jade']);
	gulp.watch('./src/html/**/**/*.html', ['htmlcopy']);
	gulp.watch('./src/js/*.js', ['js']);
	gulp.watch('./src/fonts/**/*', ['fonts']);
	gulp.watch('./src/img/**/*.*', ['imagemin']);
	gulp.watch(['./src/img/sprite/**/*.*'], ['sprite']);
});


// Browser-Sync
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: "./dist/"
		},
		port: 8080,
		open: true,
		notify: false
	});
});

// Архивируем готовые файлы
gulp.task('zip', function() {
	var timeName = getArchieveName();
	gutil.log(gutil.colors.blue('ZIP'))
	gulp.src('./dist/**/*')
		.pipe(zip(projNameForZip + '-' + timeName + '.zip'))
		.pipe(gulp.dest('./zip/'))
});

// Определяем задачу по умолчанию
gulp.task('default', ['sass', 'htmlcopy', 'js', 'fonts', 'imagemin', 'sprite', 'browserSync', 'watcher']);


// Custom helper's functions
function getArchieveName() {
	var now = new Date();
	var date = now.getDate() + '' + now.getMonth() + '' + now.getFullYear() + '-' + now.getHours() + now.getMinutes();
	return date;
}