const Sequelize = require("sequelize");
const options = {
    host: '127.0.0.1',
    logging: false,
    dialect: 'mysql',
}

const sequelize = new Sequelize("mylovemusic","root","",options)


async function main() {
    await sequelize.sync()

try {
    await sequelize.authenticate();
    console.log('Connection has been database established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = {main}