console.log("user file loaded")
var userName = "vb"
var userAge = 20

const printUserData = (a) => {
    console.log("printUserData called",a)

}
module.exports = {
    userName,userAge,printUserData

}