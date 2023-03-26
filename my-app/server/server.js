const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
app.use(cors())
app.use(express.json())


app.use(bodyParser.urlencoded({extended:true}))



const db = mysql.createPool({

  host: "localhost",
  port: 3306,
  user: "root",
  password: 'tas',
  database : 'CRUDDATABASE'

})

app.get("/", (req, res) =>{
  res.send("Hello exp");
}

)
app.get("/bookList",(req,res)=>{

  const sqlRetrieve = "SELECT * FROM LIBRARY "
  db.query(sqlRetrieve,(err,result)=>{
    console.log(result)
    res.send(result)

  })
})

app.get("/userList",(req,res)=>{

  const sqlRetrieve = "SELECT * FROM USER "
  db.query(sqlRetrieve,(err,result)=>{
    console.log(result)
    res.send(result)

  })
})


app.post("/insert",(req,res)=>{

  const name = req.body.name
  const author = req.body.author
  const genre = req.body.genre

  const sqlInsert = "INSERT INTO LIBRARY (name,author,genre) VALUES (?,?,?)"
  db.query(sqlInsert,[name,author,genre],(err,result)=>{
    console.log(err)
  })

})

app.post("/add",(req,res)=>{

  const id = req.body.id
  const password = req.body.password
  const libraryCard = req.body.libraryCard

  const sqlInsert = "INSERT INTO USER (id,password,libraryCard) VALUES (?,?,?)"
  db.query(sqlInsert,[id,password,libraryCard],(err,result)=>{
    console.log(err)
  })

})



app.delete("/delete/:name",(req,res)=>{

  const name = req.params.name
 
  const sqlDelete = "DELETE FROM LIBRARY WHERE name = ?"

  db.query(sqlDelete,name,(err,result)=>{

    if(err){
    console.log(err)
    }
  })

})

 app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, author, genre } = req.body;

  const sqlUpdate = "UPDATE LIBRARY SET name=?, author=?, genre=? WHERE id=?";
  db.query(sqlUpdate, [name, author, genre, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating book');
    } else {
      console.log(result);
      res.status(200).send('Book updated successfully');
    }
  });
});



app.listen(3001,()=>{

  console.log("App listening to port : 3001")

})