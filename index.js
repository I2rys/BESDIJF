//Dependencies
const { refactor } = require("shift-refactor")
const Is_Base64 = require("is-base64")
const Shift = require("shift-ast")
const Base_64 = require("base-64")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <input> <output>")
    process.exit()
}

if(!Fs.existsSync(Self_Args[0])){
    console.log("Invalid input.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid output.")
    process.exit()
}

console.log("Reading the javascript file data, please wait.")
const file_data = Fs.readFileSync(Self_Args[0], "utf8")

if(!file_data){
    console.log("Javascript file data is empty.")
    process.exit()
}

const $script = refactor(file_data)

console.log("Decoding all Base64 strings in the javascript data, please wait.")
$script("LiteralStringExpression").replace((node) => {
    return new Shift.LiteralStringExpression({
        value: Is_Base64(node.value, { allowEmpty: false }) ? Base_64.decode(node.value) : node.value
    })
})

console.log(`Saving the results to ${Self_Args[1]}`)
Fs.writeFileSync(Self_Args[1], $script.codegen().join("\n"), "utf8")
console.log(`Results successfully saved to ${Self_Args[1]}`)