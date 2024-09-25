const Sequelize = require('sequelize');
const sequelize = new Sequelize('internship_DataBase', 'intern1', 'MyIntern1234', {
    host: 'your_mysql_host',
    dialect: 'mysql',
    port: 3306 // Adjust if necessary
});

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING, 

        unique: true 

    }
});

module.exports = {
    sequelize,
    User
};
// app.js (or your main Node.js file)
const { sequelize, User } = require('./model');
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully!');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });// Create a new user
    User.create({ name: 'John Doe', email: 'johndoe@example.com' })
        .then(user => {
            console.log('User created:', user.get({ plain: true }));
        })
        .catch(err => {
            console.error('Error creating user:', err);
        });
    
    // Find all users
    User.findAll()
        .then(users => {
            console.log('All users:', users);
        })
        .catch(err => {
            console.error('Error finding users:', err);
        });
        require('dotenv').config();
        