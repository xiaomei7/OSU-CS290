var express= require('express');
var mysql= require('./info.js');
var http= require('http');


var app= express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',3000)
app.use('/static', express.static(__dirname + '/public'));


app.get('/select',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.send(JSON.stringify(rows));
  });
});


app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)", [req.query.wname,req.query.reps,req.query.weight,req.query.date,req.query.pounds], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    var newRowId = result.insertId;

    mysql.pool.query('SELECT * FROM workouts WHERE id=?', [newRowId], function(err, rows, fields) {

            if (err) {
                next(err);
                return;
            }
            context = rows;
            res.send(JSON.stringify(rows));
    });
  });
});

app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.delete_id], function(err, result){
    if(err){
      next(err);
      return;
    }
    });
  });
  
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.get('/updatename',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE workouts SET name=? WHERE id=? ",
    [req.query.ename, req.query.eid],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});
app.get('/updatereps',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE workouts SET reps=? WHERE id=? ",
    [req.query.ereps, req.query.eid],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});
app.get('/updateweight',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE workouts SET weight=? WHERE id=? ",
    [req.query.eweight, req.query.eid],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

app.get('/updatedate',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE workouts SET date=? WHERE id=? ",
    [req.query.edate, req.query.eid],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

app.get('/updatepounds',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE workouts SET lbs=? WHERE id=? ",
    [req.query.epounds, req.query.eid],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.use(express.static('public'));

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
