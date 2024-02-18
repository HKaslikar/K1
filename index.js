const connection = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


// Retrive data into table
app.get('/employees/:id', (req, res) => {
    connection.query('SELECT * FROM employee WHERE id=?',[req.params.id] ,(err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error retrieving employees' });
        } else {
            console.log(rows);
            //res.status(200).json(rows);
            res.send(rows);
        }
    });
});

// Delete int db
app.delete('/employees/:id', (req, res) => {
    connection.query('DELETE FROM employee WHERE id=?',[req.params.id] ,(err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error retrieving employees' });
        } else {
            console.log(rows);
            //res.status(200).json(rows);
            res.send(rows);
        }
    });
});


//Insert into db
app.post('/employees', (req, res) => {
    var emp = req.body;
    var empData = [emp.name, emp.salary]
    connection.query('INSERT INTO employee(name, salary) VALUES (?)',[empData], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error retrieving employees' });
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
});

// Update data into table
app.patch('/employees', (req, res) => {
    var emp = req.body;

    connection.query('UPDATE employee SET ? WHERE id='+emp.id,[emp], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error retrieving employees' });
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
});

// Update  using put
app.put('/employees', (req, res) => {
    var emp = req.body;

    connection.query('UPDATE employee SET ? WHERE id='+emp.id,[emp], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error retrieving employees' });
        } else {

            if(rows.affectedRows==0){
                var empData = [emp.name, emp.salary]
                connection.query('INSERT INTO employee(name, salary) VALUES (?)',[empData], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: 'Error retrieving employees' });
                    } else {
                        console.log(rows);
                        res.send(rows);
                    }
                }) 
            }
            console.log(rows);
            res.send(rows);
        }
    });
});



app.listen(3000, () => console.log('Express server is running on port 3000'));
