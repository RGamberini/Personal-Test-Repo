import os
def paste(stringInput, p=True, c=True): #Magic function to push the result to my clipboard using the xsel external program
    if p:
        os.system("echo \"" +stringInput + "\" | xsel -pi ")
    if c:
        os.system("echo \"" +stringInput + "\" | xsel -bi ")

def generateSnippit():
    words = ["First", "Second", "Third"]
    strings = []
    result = "'"
    for i in range(len(words)):
        inputstring = "";
        while (len(inputstring) < 3):
            print("Enter " + words[i] + " numeric string: ", end="")
            inputstring = input()
        result += " " + inputstring[0] + " " + inputstring[1] + " " + inputstring[2] + "\n"
    return result[:len(result) - 3] + "''"
codeSnippit = generateSnippit();
print(codeSnippit)
paste(codeSnippit, False)
