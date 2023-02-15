// Entry Point of the API Server 
  
const express = require('express');
var bodyParser = require('body-parser')

var cors = require('cors');

require('dotenv').config();
  
/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;
// const tls = require('node:tls');
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Creates sequelize for comunicating through sql
const {Sequelize} = require('sequelize'); 
const sequelize = new Sequelize('postgres://admin:5ybyVuxFrsl7LdurKbYEKEAlLr4mcKg3@dpg-cf7b98kgqg47vk2ev6ig-a.oregon-postgres.render.com/fltrbackend?ssl=true'); //example for postgres, Database URI required

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASS,
    port: 5432,
    ssl: true
});
  
pool.connect();
console.log("Connected")

async function view_users(){
    var query = await pool.query("SELECT * FROM users");
    console.log(query);
}

async function add_users(first_name,last_name,city,phone,gender,orientation,email,data_of_birth){
    //ask for user information then add it 
    var query = await pool.query(`INSERT INTO users (first_name, last_name, \
        city, phone, gender, orientation, email, date_of_birth) VALUES ( \
            '${first_name}', '${last_name}', '${city}', '${phone}', '${gender}', '${orientation}', \
            '${email}', '${data_of_birth}')`);
    console.log("user created");
}

async function delete_user(user_id){
    //ask for user information then add it 
    var query = await pool.query(`DELETE FROM users WHERE user_id=${user_id}`);
    console.log(`user ${user_id} deleted`);
}

async function update_user(field, update){
    //ask for user information then add it 
    var query = await pool.query(`UPDATE users SET ${field} = '${update}' WHERE user_id = ${user_id}`);
    console.log(`user ${user_id} ${field} updated to ${update}`);
}

async function add_image(id,image_url){
    var response = await pool.query(`SELECT image_1 FROM images_table WHERE user_id='${id}}'`);
    if (response = null){
        var query = await pool.query(`INSERT INTO images_table (user_id, image_1) VALUES ('${id}','${image_url}')`);
        console.log(`image_1 added for user ${id}`)
        return
    }
    var response = await pool.query(`SELECT image_2 FROM images_table WHERE user_id='${id}}'`);
    if (response = null){
        var query = await pool.query(`INSERT INTO images_table (user_id, image_2) VALUES ('${id}','${image_url}')`);
        console.log(`image_2 added for user ${id}`)
        return
    }
    var response = await pool.query(`SELECT image_3 FROM images_table WHERE user_id='${id}}'`);
    if (response = null){
        var query = await pool.query(`INSERT INTO images_table (user_id, image_3) VALUES ('${id}','${image_url}')`);
        console.log(`image_3 added for user ${id}`)
        return
    }
    var response = await pool.query(`SELECT image_4 FROM images_table WHERE user_id='${id}}'`);
    if (response = null){
        var query = await pool.query(`INSERT INTO images_table (user_id, image_4) VALUES ('${id}','${image_url}')`);
        console.log(`image_4 added for user ${id}`)
        return
    }
    var response = await pool.query(`SELECT image_5 FROM images_table WHERE user_id='${id}}'`);
    if (response = null){
        var query = await pool.query(`INSERT INTO images_table (user_id, image_5) VALUES ('${id}','${image_url}')`);
        console.log(`image_5 added for user ${id}`)
        return
    }
    var response = await pool.query(`SELECT image_6 FROM images_table WHERE user_id='${id}}'`);
    if (response = null){
        var query = await pool.query(`INSERT INTO images_table (user_id, image_6) VALUES ('${id}','${image_url}')`);
        console.log(`image_6 added for user ${id}`)
        return
    }
    console.log(`All images positions taken for user ${id}`);
}

async function delete_image(id, image_pos){
    var query = await pool.query(`UPDATE images_table SET image_${image_pos} = null WHERE user_id = ${id}`);
    console.log(`user ${id} image ${image_pos} deleted`);
}

view_users();


// simple route
app.get("/", (req, res) => {
 res.json({ message: "Welcome to flutr api" });
});

  
/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/
// const bodyParser = require('body-parser');
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));
  
  
// pool.connect((err, client, release) => {
//     if (err) {
//         return console.error(
//             'Error acquiring client', err.stack)
//     }
//     client.query('SELECT NOW()', (err, result) => {
//         release()
//         if (err) {
//             return console.error(
//                 'Error executing query', err.stack)
//         }
//         console.log("Connected to Database !")
//         const res = pool.query('SELECT * FROM users')
//         console.log(res)
//     })
// })
  
// // app.get('/testdata', (req, res, next) => {
// //     console.log("TEST DATA :");
// //     pool.query('Select * from test')
// //         .then(testData => {
// //             console.log(testData);
// //             res.send(testData.rows);
// //         })
// // })
  

 

 // routes
 require('./app/login/routes/auth')(app);
 require('./app/login/routes/account')(app);
 // Require the Routes API  
 // Create a Server and run it on the port 3000
 

 const PORT = process.env.PORT || 3000;
 const server = app.listen(PORT, function () {
    console.log(`Server is running on ${PORT}.`)
     let host = server.address().address
     let port = server.address().port
     // Starting the Server at the port 3000
})