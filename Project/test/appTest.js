const assert = require("chai").assert;
const expect = require("chai").expect;
const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../app.js")

chai.use(chaiHttp)

describe("App", function(){
        it("app status", function(done) {
            chai.request(server).get("/")
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
            })
        })
})