//Database code
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config =
    {
        userName: 'chaze', // update me
        password: 'Hustle247', // update me
        server: 'chazeserverwe.database.windows.net', // update me
        options:
            {
                database: 'chazeDB' //update me
                , encrypt: true
            }
    }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            queryDatabase()
        }
    }
);

function queryDatabase()
{ console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        "select * from dbo.Training",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}


/*client side code*/
const express = require('express');
const path = require('path');
const app=express();
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


app.use(express.static(__dirname));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/Login.html'))
});


app.post('/login/:username/:password', function (req, res) {
    var status = checkSignIn(req.params.username, req.params.password);
    if (status === false) {
        res.status(404);
    }
    else {
        res.status(200);
    }
    res.send();
});