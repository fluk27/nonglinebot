const { Client } = require('pg');

const client = new Client({
  connectionString:'postgres://ddnfgozrdtykfs:8cfc8b80087cafa033d0cd58353a1c09dd87edd6b7a2b09a13317702ddf7b9cd@ec2-184-73-169-163.compute-1.amazonaws.com:5432/d2tvd3br9irf7q',
  ssl: true,
});


const  CTB = 'CREATE TABLE question(id SERIAL PRIMARY KEY,name VARCHAR NOT NULL);'
const IDB = "INSERT INTO question (name) VALUES ($1)"
const SDB = "select * from question"
// client.query(CTB,(err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });
 
let createData=()=>{
    client.connect();
    client.query(CTB,(err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
      });
}

let addData=(params)=>{
    client.connect();
    client.query(IDB,[params],(err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
      });
}
let  getData=()=>{
    client.connect();
    let result = []
     client.query(SDB,(err, res) => {
        result.push(res.rows)
        if (err) throw err;
        for (let row of res.rows) {
            
          console.log(JSON.stringify(row));
        }
       
        console.log(`this is = ${result}`);
      });
      client.end();
    
     
      return result
    
      
}
module.exports= {
    createData:createData,
    addData:addData,
    getData:getData,
    clientDB:client
}