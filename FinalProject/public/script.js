document.addEventListener('DOMContentLoaded', callSelect);
document.addEventListener('DOMContentLoaded', bindButton);

function createTable(data)
{
	var newTable = document.createElement("table");
	var newHead = document.createElement("thead");
	var newBody = document.createElement("tbody");

	newTable.setAttribute('id','tableID');
	document.body.appendChild(newTable);

	newTable.appendChild(newHead);
	newTable.appendChild(newBody);

	// Head
	var headers = ["","name","reps","weight","date","lbs"];
	var headRow = document.createElement("tr"); 
	
	newHead.appendChild(headRow);

	for(var i in headers)
	{
		var newHeader = document.createElement("th");
		newHeader.textContent = headers[i];
		headRow.appendChild(newHeader);
	}


	// Body	
	for(var i in data)
	{
		var newRow = document.createElement("tr");
		var rowID = null;
		var hiddenID = 1; 

		for(var j in data[i])
		{
			var newCell = document.createElement("td");
			newCell.textContent = data[i][j];
			if(hiddenID === 1)
			{
				newCell.style.visibility = "hidden";
				hiddenID = 0; 
			}

			newRow.appendChild(newCell);
		}

		// Delete
		var newButton = document.createElement("button");
		var buttonText = document.createTextNode("delete");
		newButton.appendChild(buttonText);

		newButton.id = newRow.firstChild.textContent;
		newButton.onclick = function(x)
		{
			return function()
			{
				deleteButton(x);
			};
		}(newButton.id);  
		newRow.appendChild(newButton);
		
		// Edit
		var upButton = document.createElement("button");
		var upText = document.createTextNode("edit");
		upButton.appendChild(upText);

		upButton.id = newRow.firstChild.textContent;
		upButton.onclick = function(x)
		{
			return function()
			{
				editButton(x);
			};
		}(upButton.id); 
		newRow.appendChild(upButton);
		
		newBody.appendChild(newRow);
	}
}


function deleteTable()
{
	var table = document.getElementById('tableID');
	table.parentNode.removeChild(table); 
}

function callSelect()
{
	var req = new XMLHttpRequest();

	req.open('GET', "http://52.35.2.29:3000/select", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function()
	{
		var response = JSON.parse(req.responseText); 
		createTable(response); 
	});
	req.send(); 
}

function bindButton()
{
	document.getElementById('addExercise').addEventListener("click", function(event)
	{
		
		var dataInput = {}; 
		dataInput.name = document.getElementById("name").value;
		dataInput.reps = document.getElementById("reps").value;
		dataInput.weight = document.getElementById("weight").value;
		dataInput.date = document.getElementById("date").value;
		var radio = document.getElementsByName("measure");

	    if(radio[0].checked) 
	    {
	    		dataInput.measure = "1";
	    }
	    else
	    {
	        dataInput.measure = "0";
	    }

		var req = new XMLHttpRequest();
		var url= "http://52.35.2.29:3000/insert?name=" 
		+ dataInput.name + "&reps=" + dataInput.reps + "&weight=" 
		+ dataInput.weight + "&date=" + dataInput.date + "&lbs=" + dataInput.units;
		
		req.open('GET', url, true);
		req.addEventListener('load',function()
		{
			deleteTable(); 
			callSelect(); 
		});
		req.send(); 
		event.preventDefault(); 
	});
};

function updateGET(id)
{
	var dataInput = {};
	dataInput.id = id;
	dataInput.name = document.getElementById("newName").value;
	dataInput.reps = document.getElementById("newReps").value;
	dataInput.weight = document.getElementById("newWeight").value;
	dataInput.date = document.getElementById("newDate").value;
	var radio = document.getElementsByName("newMeasure");

    if(radio[0].checked)
    {
    	dataInput.units = "1";
    }
    else
    {
    	dataInput.units = "0";
    }

	var req = new XMLHttpRequest();
	var url= "http://52.35.2.29:3000/update?id=" + dataInput.id 
	+ "&name=" + dataInput.name + "&reps=" + dataInput.reps + "&weight=" 
	+ dataInput.weight + "&date=" + dataInput.date + "&lbs=" + dataInput.units;
		
	req.open('GET', url , true);
	req.addEventListener('load',function()
	{
		deleteTable(); 
		callSelect(); 
		document.body.removeChild(document.getElementById("newForm" + id));
	});
	req.send(); 
	event.preventDefault(); 

};


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