//Database code

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var request = new Request();
var user=".";
var userid=".";
var training=".";
var email=".";
var userMap = new Map();// Create connection to database
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
            console.log("got a connection");
            //queryDatabase()
        }
    }
);

/*            LOGIN           */
function queryDatabasel(email,pass,callback)
{
    console.log('Reading rows from the Table...');
    console.log('from login');
    // Read all rows from table
    request = new Request(
        "select * from dbo.Users",
        function(err, rowCount, rows)
        {
            //console.log(rowCount + ' row(s) returned');
        }
    );
    var c=0;
    var call=0;
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            //console.log("%s\t%s", column.metadata.colName, column.value);
            if(column.metadata.colName=="Email"){
                if(column.value==email) {
                    email=column.value;
                    //console.log("c became 1");
                    c=1;
                }
                else {
                    //console.log("c became 0");
                    c = 0;
                }
            }
            if(c==1)
            {
                if(column.metadata.colName=="FullName") {
                    //console.log("this is password column   "+column.value+"  "+pass);
                    user=column.value;
                }
                //console.log("c was 1");
                if(column.metadata.colName=="Password") {
                    //console.log("this is password column   "+column.value+"  "+pass);
                    if (column.value == pass) {
                        //console.log("password matched");
                        userMap.set(user,email,pass);
                        callback(null,200);
                        call=1;
                    }
                }
            }
        });
        setTimeout(function () {
            if(call==0) {
                callback(null, 404);
            }
        },250);
    });

    connection.execSql(request);
}
/*                    SIGN UP              */
function squeryDatabase(fullname,email,pass,callback)
{
    console.log('Reading rows from the Table...');
    console.log('from sign in');
    // Read all rows from table
    request = new Request(
        "select * from dbo.users",
        function(err, rowCount, rows)
        {
            //console.log(rowCount + ' row(s) returned');

        }
    );
    var call=0;
    request.on('row', function(columns) {


        columns.forEach(function(column) {
            if(column.metadata.colName=="Email"){
                if(column.value==email) {
                 callback(null,404);
                 call=1;
                }
            }
        });
        setTimeout(function () {
            if(call==0) {
                callback(null, 200);
                call=-1;
            }
        },250);

    });
    connection.execSql(request);
}
/*Get training data using the userid passed in arguments*/
function gettrainingdata(userid,callback)
{
    var rowcount=0;
    console.log('Reading rows from the training...');
    console.log('from get training');
    var query= "select userId,backstroke,breaststroke,butterfly,distperlength,freestyle from training where userid="+userid;
    request = new Request(
        query,function(err, rowCount, rows)
        {
            rowcount=rowCount;
            if(err)
            {
            console.log("an error occured");
            }
            console.log(rowCount + ' row(s) returned');
        }
    );
    var call=0;
    request.on('row', function(columns) {
        rowcount=rowcount-1;
        console.log(rowcount);
        columns.forEach(function(column) {
            if(column.metadata.colName=="Userid"){
                console.log(column.value);
            }
            if(call==1 && column.metadata.colName=="backstroke")
            {
                console.log(column.value);
                training="%"+column.value;
            }
            if(call==1 && column.metadata.colName=="breaststroke")
            {
                console.log(column.value);
                training=training+"%"+column.value;
            }
            if(call==1 && column.metadata.colName=="distperlength")
            {
                 console.log("dist:" +column.value);
                training=training+"%"+column.value;
            }
            if(call==1 && column.metadata.colName=="freestyle")
            {
                training=training+"%"+column.value;
            }
            
        });
        setTimeout(function () {
            if(rowcount==1)    
            callback(null,200);
        },250);

    });
    connection.execSql(request);
}
//////////////////////////////////////////////////////////////////////
/*Get user id from the user table */
function getuserid(email,callback)
{
 
    console.log('Reading rows from the Table...');
    console.log('from get userid');
    
    // Read all rows from table
    request = new Request(
        "select * from dbo.users",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
        }
    );
    
    var call=0;
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if(column.metadata.colName=="Email"){
                if(column.value==email) {
                    if(call!=-1 && call!=2)
                    call=1;
                }
            }
            if(call==1 && column.metadata.colName=="userId")
            {
                userid=column.value;
                call=-1;
            }
            
        });
        setTimeout(function () {
            if(call==-1) {
                console.log(userid);
                callback(null,200);
                call=2;
            }
        },750);

    });
    connection.execSql(request);
}

/*client side code*/
const express = require('express');
const path = require('path');
const app=express();
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function checkemail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//app.use(express.static(__dirname));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/login.html'))
});

app.use(express.static(__dirname));
//login
app.post('/login/:username/:password', function (req, res) {
    if(checkemail(req.params.username)==0)
    {
        res.status(401);
        res.send();
    }
    else {
        queryDatabasel(req.params.username, req.params.password, function (err, status) {
            //console.log("login:  " +status);
            if (status === 200) {
                   console.log("logged in");
                res.status(200);
            }
            else {
                res.status(404);
            }
            res.send();
        });
    }
});


//sign up
app.post('/signup/:fullname/:email/:password', function (req, res) {
    if(checkemail(req.params.email)==0)
    {
        res.status(401);
        res.send();
    }
    else {
        squeryDatabase(req.params.fullname, req.params.email, req.params.password, function (err, status) {
            user = req.params.fullname;
            if (status == 200) {
                var insert = "insert into dbo.users values('" + req.params.email + "','" + req.params.fullname + "','" + req.params.password + "','false');";
                //console.log(insert);
                var requ = new Request(
                    insert, function (err) {
                        if (err) {
                            console.log("error");
                            console.log(err);
                        }
                        else {
                            userMap.set(req.params.fullname,req.params.email, req.params.password);
                            console.log("row inserted");
                            res.status(200);
                        }
                    });

                connection.execSql(requ);
            }
            else {
                console.log("404 insert")
                res.status(404);
            }
            res.send();
        });
    }
});

//get username
app.post('/get/:username', function (req, res) {
    var email=req.params.username;
    for (var entry of userMap.entries()) {
        console.log(entry[1]+"  "+email);
        if (entry[1] == email) {
            res.status(200);
            res.send(entry[0]);
            return;
        }
    }
    res.status(404);
    res.send();

});

app.post('/userid/:username', function (req, res) {
    console.log("entered get");
   
    var email=req.params.username;
    getuserid(email, function (err,status) {
            console.log("get username :  " +status+" userid :"+userid);
        var userId=userid+" ";
            if (status === 200) {
                gettrainingdata(userId,function(err,status){
                if(status===200)
                {
                    res.status(200);
                    res.send(training+"");
                    return;
                }
                else 
                {
                    res.status(404);
                    res.send();
                }
                });
            }
            else {
             res.status(404);
            res.send();
            }
        });
  });


var http = require('http');
var httpServer = http.createServer(app);

var port= process.env.PORT ||1337;

httpServer.listen(port, function(err){
    if(err)
    console.log("something bad happened");
    else
    console.log("server running at https://IP_ADDRESS:/"+port);
});
