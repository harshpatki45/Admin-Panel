const mysql2 = require("mysql2")
// const mysql = require("mysql2");

// const connection = mysql
//   .createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "project",
//     connectionLimit: 10,
//   });


const connection = mysql2.createConnection({

  host: "127.0.0.1",
  user: "root",
  password: "", 
  database: "datatable",
   port: 3305,


});
function connectToDatabase() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL database:", err);
      return;
    }

    return console.log("Connected to MySQL database");
  });
}

connectToDatabase();

module.exports = { connectToDatabase, connection };

 
module.exports = { connection };