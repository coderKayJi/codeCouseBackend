const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'dbaccesscode',
    port: 5432,
})

client.connect(function (err) {
    if (err) {
        console.log(err.toString(), "CLIENT")
    } else {
        console.log("Connected!");
    }
});

module.exports = client;
