
const express = require('express');
const db = require('./db');

// const mysql = require('mysql2');

// const pool = mysql.createPool(
// //   {
// //   host:'localhost',
// //   user:'root',
// //   password:"root",
// //   database:"sgt_m4_1019",
// //   // port:3306   // by default
// // }
// )

// const db = pool.promise();

const app = express();

app.use(express.json());

app.get('/api/students',async(req,res)=>{
  const result = await db.query(`select * from grades`)
  res.send({
    message:"this will contain students",
    student:result
  })
})

app.get('/api/students/:id',async(req,res)=>{

  const result = await db.query(`select name,course,grade from grades where id = ${req.params.id}`)
  res.send({
    message:`this will contain ${req.param.id} students`,
    student:result
  })
})

app.delete('/api/students/:id',async(req,res)=>{

  const result = await db.query(`delete from grades where id = ${req.params.id}`)
  res.send({
    message:`student of id:  ${req.params.id} deleted`,
    student:result
  })
})

// app.put('/api/students/:id',async(req,res)=>{

//   const result = await db.query(`update from grades set name = '${}'  where id = ${req.params.id}`)
//   res.send({
//     message:`student of id:  ${req.param.id} deleted`,
//     student:result
//   })
// })



app.post(`/api/students`,async (req,res) => {   

  try{
    const body = {
      "name" : req.body.name,
      "course" : req.body.course,
      "grade" : req.body.grade
    }
    const result  = await db.query(`INSERT INTO grades (name, grade, course) VALUES 
                                  ('${body.name}','${body.grade}','${body.course}')`);

    res.send({
      message: `${result.name} has been at too student list`});
      
    }catch(error){
      console.log(`Error : ${error}`);
    }
      
})



const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server listen on port ${port}`));




