//Database code

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var request = new Request();
 var crypto = require('crypto');

/*blob initialization*/
const path = require('path');
const storage = require('azure-storage');
//const blobService = storage.createBlobService();
/*ends*/

var user=".";
var userid=".";
var training=".";
var blob=".";
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

    // Read all rows from table
    request = new Request(
        "select email,fullname,salt,password from dbo.Users",
        function(err, rowCount, rows)
        { 
          if(err)
            console.log("problem with login selct statement");
        }
    );
    var c=0;
    var call=0;
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if(column.metadata.colName=="email"){
               if(column.value==email) {
                    email=column.value;
                    c=1;
                }
                else {
               
                    c = 0;
                }
            }
            if(c==1)
            {
                if(column.metadata.colName=="fullname") {
                    user = column.value;
                }
                if(column.metadata.colName=="salt")
                {
                 console.log("\n   "+column.value+"\n")
                  salt = column.value;
                }
                if(column.metadata.colName=="password") {
                     //var hash=crypto.createHash('sha256').update(pass).digest("hex");
                    //var salt = crypto.randomBytes(8).toString('hex').slice(0,16);  
                 var hash = crypto.createHmac('sha512', salt);
                     hash.update(pass);
                   hash = hash.digest('hex');
                    if (column.value == hash) {
           
                        userMap.set(user,email,hash);
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
 
    // Read all rows from table
    request = new Request(
        "select * from dbo.users",
        function(err, rowCount, rows)
        {

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
   
    var query= "select id,createdat,backstroke,breaststroke,distperlength,freestyle from training where userid="+userid;
    request = new Request(
        query,function(err, rowCount, rows)
        {
            if(err)
            {
            console.log("an error occured");
            }
            
        }
    );
    var count=0;
    var c=0;
    request.on('row', function(columns) {
        columns.forEach(function(column) {
          count++;
           
            //console.log(count);
          if(c==0 && column.metadata.colName=="id")
            {
                //console.log(column.value);
                training=training+"!"+"%"+column.value;
            }
          if(c==0 && column.metadata.colName=="createdat")
            {
                //console.log(column.value);
                training=training+"%"+column.value;
            }
            if(c==0 && column.metadata.colName=="backstroke")
            {
                //console.log(column.value);
                training=training+"%"+column.value;
            }
            if(c==0 && column.metadata.colName=="breaststroke")
            {
                //console.log(column.value);
                training=training+"%"+column.value;
            }
            if(c==0 && column.metadata.colName=="distperlength")
            {
                //console.log("dist:" +column.value);
                training=training+"%"+column.value;
            }
            if(c==0 && column.metadata.colName=="freestyle")
            {
                training=training+"%"+column.value;
            }
            
        });
        setTimeout(function () {    
            if(c==0 && count>43)
            {
               callback(null,200);
                c=1;
            }
        },200);

    });
    connection.execSql(request);
}

//////////////////////////////////////////////////////////////////////
/*Get user id from the user table */
function getuserid(email,callback)
{
    // Read all rows from table
    request = new Request(
        "select * from dbo.users",
        function(err, rowCount, rows)
        {
          
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
            
                callback(null,200);
                call=2;
            }
        },750);

    });
    connection.execSql(request);
}
//blob asasync code
 const downloadBlob = async (containerName, blobName) => {
    const dowloadFilePath =  path.resolve(path.resolve(__dirname) + "/" + blobName);
    console.log(dowloadFilePath);
    return new Promise((resolve, reject) => {
     var connectionString = "DefaultEndpointsProtocol=https;AccountName=chazestorage;AccountKey=DwW+/PUZTVGYWFhoP2F1LUKorUgNh4Sp3BW/E831kS6AvnzCpzGh5DLKXD4wnrgQQDtAYeL0hy7oLVJTtKOYKA==;EndpointSuffix=core.windows.net";
     const blobService = storage.createBlobService(connectionString);
        blobService.getBlobToText(containerName, blobName, (err, data) => {
            if (err) {
                reject(err);
            } else {
             blob=data;
               // console.log(`${data}`);
            }
        });
    });
};

async function asyncblob(containerName,blobName)
{
 await downloadBlob(containerName, blobName);
}



/*client side code*/
const express = require('express');
const app=express();

function checkemail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//app.use(express.static(__dirname));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/public/login.html'))
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
            if (status === 200) {
              
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
app.post('/signup/:fullname/:email/:password/:fb', function (req, res) {
    if(checkemail(req.params.email)==0)
    {
        res.status(401);
        res.send();
    }
    else {
        squeryDatabase(req.params.fullname, req.params.email, req.params.password, function (err, status) {
            user = req.params.fullname;
          process.stdout.write(status);
            //var hash=crypto.createHash('sha256').update(req.params.password).digest("hex");
              var salt = crypto.randomBytes(8).toString('hex').slice(0,16);  
                 var hash = crypto.createHmac('sha512', salt);
                     hash.update(req.params.password);
                  hash = hash.digest('hex');
          if (status == 200) {
                var insert = "insert into dbo.users(Email,Fullname,Password,Deleted,Salt) values('" + req.params.email + "','" + req.params.fullname + "','" + hash + "','false','" + salt + "');";
               
                var requ = new Request(
                    insert, function (err) {
                        if (err) {
                            console.log("error");
                            console.log(err);
                        }
                        else {
                            userMap.set(req.params.fullname,req.params.email, req.params.password);
                           
                            res.status(200);
                        }
                    });

                connection.execSql(requ);
            }
            else {
             if(req.params.fb=="fb")
             {
              userMap.set(req.params.fullname,req.params.email, req.params.password);
           }
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
       
        if (entry[1] == email) {
            res.status(200);
            res.send(entry[0]);
            return;
        }
    }
    res.status(404);
    res.send();

});


//get blob data
app.post('/blob/:containerName/:blobName', function (req, res) {
 console.log("\n"+req.params.containerName+"    "+req.params.blobName+"\n");
var containerName=req.params.containerName;
 var blobName=req.params.blobName;
asyncblob(containerName,blobName);
   //download blob ends
   setTimeout(function () {
 console.log("waiting");
       
 res.status(200);
 res.send(blob+"");
 },700);
});


//get username and get trainings based on username 
app.post('/userid/:username', function (req, res) {

   
    var email=req.params.username;
    getuserid(email, function (err,status) {
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
