//Dependencies
const Simple_Exec = require("simple-exec")

//Main
describe("Upon executed", ()=>{
    it("should decode all the Base64 encoded strings in the test/example.js and save the results to test/output.js", async()=>{
        const results = await Simple_Exec.executeSync("node index.js test/example.js test/output.js")

        expect(results.output).toContain("Results successfully saved to")
    })

    it("should return an error", async()=>{
        const results = await Simple_Exec.executeSync("node index.js test/example.js")

        expect(results.output).toEqual("Invalid output.")
    })
})