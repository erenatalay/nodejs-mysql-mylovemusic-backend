const bcrypt = require("bcrypt")

const validateUserInput = (email,password) => {
    return password && email
}

const comparePassword = (password,hashedPassword) => {
   return  bcrypt.compareSync(password,hashedPassword)
}

module.exports = {validateUserInput,comparePassword}