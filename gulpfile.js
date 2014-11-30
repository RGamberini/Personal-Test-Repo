var gulp = require("gulp"),
    sass = require("gulp-ruby-sass"),
    concat = require("gulp-concat");
    // Compile Our Sass
gulp.task("sass", function() {
    return gulp.src("ZombieAttempt/src/SCSS/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("ZombieAttempt/build/CSS/"));
});

// ConcatenateJS
gulp.task("concat", function() {
    return gulp.src(["ZombieAttempt/src/JS/states.js","ZombieAttempt/src/JS/grid.js","ZombieAttempt/src/JS/graphics.js","ZombieAttempt/src/JS/game.js"])
        .pipe(concat("main.js"))
        .pipe(gulp.dest("ZombieAttempt/build/JS/"))
});

gulp.task("copy", function() {
  gulp.src("ZombieAttempt/src/index.html")
    .pipe(gulp.dest("ZombieAttempt/build/"));
    gulp.src("ZombieAttempt/src/JS/libs/*.js")
    .pipe(gulp.dest("ZombieAttempt/build/JS/libs/"));
});

gulp.task("default", ["concat", "sass", "copy"]);
