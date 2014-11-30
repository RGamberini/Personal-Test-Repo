dirVectors = """[new Location(0, 1), new Location(1, 1), new Location(1, 0), new Location(1, -1),new Location(0, -1), new Location(-1, -1), new Location(-1, 0), new Location(-1, 1)]"""

dirEctions = ["Up", "UpRight", "Right", "DownRight", "Down", "DownLeft", "Left", "UpLeft"];

x = dirVectors[1:len(dirVectors) - 2].split("),")
for i in range(len(x)):
    print(",")
    print(dirEctions[i] + ": " + x[i] + ")", end="" )
