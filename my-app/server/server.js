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
/*
app.get("/borrowedBookList/:idUser",(req,res)=>{
  const idUser = req.params.idUser;
  alert(idUser);
  const sqlRetrieve = "SELECT * FROM CRUDDATABASE.BORROW WHERE idUser = ?";
  db.query(sqlRetrieve,(err,result)=>{
    console.log(result)
    res.send(result)
  })
})
*/

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
    console.log(err);
    }
  })
  /*
  if (err) {
      console.log(err);
      res.status(500).send('Error borrowing book');
    } else if (result.affectedRows === 0) {
      res.status(200).send('Book not found or already borrowed');
    } else {
      res.status(404).send('Book borrowed returned');
    }
  */
})
app.get('/borrowedBookList/:idUser', (req, res) => {
  const idUser = req.params.idUser;
  console.log("idUser is =", idUser);
  const sqlRetrieve = "SELECT * FROM CRUDDATABASE.BORROW WHERE idUser = ?";
  db.query(sqlRetrieve, [idUser], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get('/borrowedBookList/:idUser', (req, res) => {
  const idUser = req.params.idUser;
  console.log("idUser is =", idUser);
  const sqlRetrieve = "SELECT * FROM CRUDDATABASE.BORROW WHERE idUser = ?";
  db.query(sqlRetrieve, [idUser], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.delete("/ret/:id",(req,res)=>{
  const id = req.params.id;
  const sqlDelete = "DELETE FROM BORROW WHERE id = ?";
  db.query(sqlDelete,id,(err,result)=>{
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

/*
app.post("/userLogin", (req, res) => {
  const { libraryCard, password } = req.body;
  const sqlQuery = "SELECT * FROM USER WHERE libraryCard = ? AND password = ?";
  db.query(sqlQuery, [libraryCard, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    } else if (result.length === 0) {
      res.status(401).send("Invalid library card number or password");
    } else {
      // User is authenticated
      const user = result[0];
      res.send(`Welcome ${user.libraryCard} !`);
    }
  });
});
*/
app.post('/userLogin', (req, res) => {
  const { libraryCard, password } = req.body;
  const sql = 'SELECT * FROM USER WHERE libraryCard = ? AND password = ?'  ;
  db.query(sql, [libraryCard, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(401).json({ message: 'Invalid library card number' });
    } else {
      const user = results[0];
      if (user.password === password) {
        // Passwords match, user is authenticated
        const sessionID = user.libraryCard; // Generate a session ID
        res.json({ loggedIn: true, sessionID });
        //res.json({ loggedIn: true });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    }
  });
});


app.post('/userLogout', (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(505).json({ message: 'Internaaaaal server error' });
    } else {
      res.json({ loggedOut: true });
    }
  });
});



app.post('/managerLogin', (req, res) => {
  const { id, password } = req.body;
  const sql = 'SELECT * FROM MANAGER WHERE id = ? AND password = ?'  ;
  db.query(sql, [id, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      //alert("Login hoy nai!");
      res.status(401).json({ message: 'Invalid library card number' });
    } else {
      const user = results[0];
      if (user.password === password) {
        // Passwords match, user is authenticated
        res.json({ loggedIn: true });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    }
  });
});
/*
app.get('/api/checkAvailability/:id', (req, res) => {
  //const { id } = req.query;
  const { id } = req.params.id
  const result = db.query('SELECT * FROM CRUDDATABASE.LIBRARY WHERE id = ? AND availability = 1', [id]);
  if (result.length > 0) {
    res.json({ available: true });
  } else {
    res.json({ available: false });
  }
});
*/
app.get("/api/checkAvailability/:id", (req, res) => {
  const id = req.params.id;

  const sqlQuery = 'SELECT * FROM CRUDDATABASE.LIBRARY WHERE id = ? AND availability = 1';
  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send('Error retrieving book availability');
    } else if (result.length === 0) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
    // res.send(result)
  });
});

app.put('/borrow/:id', (req, res) => {
  console.log("ok server put");
  const id = req.params.id;
  const { libraryCard, date } = req.body;

  const sqlQuery = 'UPDATE CRUDDATABASE.LIBRARY SET availability = 0 WHERE id = ?';
  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error borrowing book');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Book not found or already borrowed');
    } else {
      res.status(200).send('Book borrowed successfully');
    }
  });
});

app.put('/makeAvailable/:id', (req, res) => {
  console.log("dhukse");
  const id = req.params.id;
  console.log(id);
  const { availablity } = req.body;

  const sqlQuery = 'UPDATE CRUDDATABASE.LIBRARY SET availability = 1 WHERE id = ?';
  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error borrowing book');
    } else if (result.affectedRows === 0) {
      res.status(200).send('Book not found or already borrowed');
    } else {
      res.status(404).send('Book borrowed returned');
    }
  });

  
});

app.post('/addToBorrow/:id', (req, res) => {
  const idBook = req.params.id;
  const { libraryCard, date } = req.body;
//const idUser = req.body.libraryCard ;
//const date = req.body.date; 
//alert(date);

  const insertBorrowQuery = 'INSERT INTO BORROW ( idUser,idBook, date) VALUES (?, ?, ?)';
  db.query(insertBorrowQuery, [ libraryCard,idBook, date], (insertBorrowErr, insertBorrowResult) => {
    if (insertBorrowErr) {
      console.log(insertBorrowErr);
      res.status(500).send('Error adding book to borrow list');
    } else {
      res.status(200).send('Book added to borrow list successfully');
    }
  });
});
/*
 app.get('/userNotification/:idUser', (req, res) => {
    const idUser = req.params.idUser;

    const cDate = new Date();
    const year = cDate.getFullYear();
    const month = (cDate.getMonth() + 1).toString().padStart(2, '0');
    const day = cDate.getDate().toString().padStart(2, '0');
    const curDate = `${year}${month}${day}`;
    const currentDate = parseInt(curDate, 10);
    console.log(currentDate);

  
    const sqlRetrieve = "SELECT * FROM CRUDDATABASE.BORROW WHERE idUser = ? AND (currentDate - date) > 0";
    db.query(sqlRetrieve, [idUser], (err, result) => {
      console.log("dhukse");
      if (err) {
        console.error(err);
        res.status(505).send("Serveeeeeeer error");
      } else {
        console.log(result);
        res.send(result);
      }
    });
  });
  */
app.get('/borrowedBookList/:idUser', (req, res) => {
  const idUser = req.params.idUser;

  console.log("idUser is =", idUser);
  const sqlRetrieve = "SELECT * FROM CRUDDATABASE.BORROW WHERE idUser = ?";
  db.query(sqlRetrieve, [idUser], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get('/borrowedBookListManager', (req, res) => {
  //const idUser = req.params.idUser;

  //console.log("idUser is =", idUser);
  const sqlRetrieve = "SELECT * FROM CRUDDATABASE.BORROW ";
  db.query(sqlRetrieve, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get('/userNotification/:idUser', (req, res) => {
  const idUser = req.params.idUser;

  const cDate = new Date();
    const year = cDate.getFullYear();
    const month = (cDate.getMonth() + 1).toString().padStart(2, '0');
    const day = cDate.getDate().toString().padStart(2, '0');
    const curDate = `${year}${month}${day}`;
    const currentDate = parseInt(curDate, 10);
    //console.log(currentDate);


  console.log("idUser is =", idUser);
  const sqlRetrieve = "SELECT * FROM CRUDDATABASE.BORROW WHERE idUser = ? AND (? - date > 0)";
  db.query(sqlRetrieve, [idUser, currentDate], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});


app.get('/overdue', (req, res) => {
 // const idUser = req.params.idUser;

    const cDate = new Date();
    const year = cDate.getFullYear();
    const month = (cDate.getMonth() + 1).toString().padStart(2, '0');
    const day = cDate.getDate().toString().padStart(2, '0');
    const curDate = `${year}${month}${day}`;
    const currentDate = parseInt(curDate, 10);
    //console.log(currentDate);


  //console.log("idUser is =", idUser);
  const sqlRetrieve = "SELECT * FROM CRUDDATABASE.BORROW WHERE  (? - date > 0)";
  db.query(sqlRetrieve, [currentDate], (err, result) => {
    if (err) {
      console.error(err);
      res.status(505).send("Server error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get('/api/mostFrequentBookId', async (req, res) => {
  const mostFrequentBookId = await BORROW.aggregate('idBook', 'COUNT', { distinct: true})
    .then((result) => {
      if (result.length === 0) {
        return null;
      }
      const mostFrequent = result.reduce((prev, curr) => (prev.count > curr.count ? prev : curr));
      return mostFrequent.idBook;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  res.json({ mostFrequentBookId });
});


app.listen(3001,()=>{

  console.log("App listening to port : 3001")

});