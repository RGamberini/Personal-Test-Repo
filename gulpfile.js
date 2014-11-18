var gulp = require("gulp"),
    sass = require("gulp-ruby-sass"),
    concat = require("gulp-concat");
    // Compile Our Sass
gulp.task("sass", function() {
    return gulp.src("ZombieAttempt/src/SCSS/*.Scss")
        .pipe(sass())
        .pipe(gulp.dest("ZombieAttempt/build/"));
});

// ConcatenateJS
gulp.task("concat", function() {
    return gulp.src("ZombieAttempt/src/JS/*.js")
        .pipe(concat("main.js"))
        .pipe(gulp.dest("ZombieAttempt/build/JS/"))
});

gulp.task("default", ["concat", "sass"]);
