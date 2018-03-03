//receive post request from pagination.html

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.listen(9090);
console.log('Server is online.');

//var CurrentPage;
//var CurrentTime;
//var log={CurrentPage:"1",CurrentTime:"2"};

app.post('/endpoint', function(req, res){

    console.log('post has been found');
    console.log(req.body);
    console.log('body is gotten');

    res.send(req.body);

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'guang',
        database : 'readinglogdb'
    });
//instantiation
    connection.connect();
    console.log('database has been connected');

//insert test query
    var  addSql = 'INSERT INTO RLOG (Stdnum,CurrentPage,CurrentTime) VALUES(?,?,?)';

    var  addSqlParams = [req.body.stdId,Number(req.body.currentPage),req.body.currentTime];

    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);
        console.log('INSERT ID:',result);
        console.log('-----------------------------------------------------------------\n\n');
    });

    connection.end();

});