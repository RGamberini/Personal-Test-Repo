x = """add 'ZombieAttempt/src/JS/board.js'
add 'ZombieAttempt/src/JS/game.js'
add 'ZombieAttempt/src/JS/graphics.js'
add 'ZombieAttempt/src/JS/grid.js'
add 'ZombieAttempt/src/JS/main.js'
add 'ZombieAttempt/src/JS/states.js'"""
for line in x.split("\n"):
    print("git " + line)
