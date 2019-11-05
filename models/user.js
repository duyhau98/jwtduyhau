var db = require('../untils/mydb');

module.exports = {
    all: () => {
        return db.load('select * from user');
    },

    add: (user) => {
        return db.load(`insert into user set username = '${user.username}', password = '${user.password}'`);
    },
    
    single: (id) => {
        return db.load(`select * from user where id = ${id}`);
    },

    findUsername: (username) => {
        return db.load(`select * from user where username = '${username}'`);
    },
    
    update: (entity) => {
        return db.update('user', 'id', entity);
    },

    delete: (id) => {   
        return db.delete('user', 'id', id);
    },
    singleByUserNamePassword: (username,password) => {
        return db.load(`select * from user where username = '${username}' and password = '${password}'`);
    }
}