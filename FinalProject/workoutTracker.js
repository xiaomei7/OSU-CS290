var express = require('express');
var pool = require('./config').pool;

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'SuperSecretPassword'}));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);


app.get('/',function(req,res,next){
  var context = {};
  res.render('home', context);
});

//selecting data
app.get('/select',function(req,res,next){
  pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    res.send(JSON.stringify(rows));
  });
});


//Insert data into the database
app.get('/insert',function(req,res,next){
  var context = {};
  pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }
    //res.send(JSON.stringify(result)); //This line caused a problem that killed the node app
    res.render('home', context);
  });
});

//Update data in the database
app.get('/update',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.lbs || curVals.lbs, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

//Delete data in the database
app.get('/delete',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query("DELETE FROM workouts WHERE id=? ",
        [req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Deleted " + result.affectedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});


app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://52.35.2.29:' + app.get('port') + '; press Ctrl-C to terminate.');
});