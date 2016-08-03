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
		
		// Update
		var upButton = document.createElement("button");
		var upText = document.createTextNode("update");
		upButton.appendChild(upText);

		upButton.id = newRow.firstChild.textContent;
		upButton.onclick = function(x)
		{
			return function()
			{
				updateButton(x);
			};
		}(upButton.id); 
		newRow.appendChild(upButton);
		
		newBody.appendChild(newRow);
	}
}

function deleteButton(id)
{
	var req = new XMLHttpRequest();

	req.open('GET', "http://52.35.2.29:3000/delete?id=" + id , true);
	req.addEventListener('load',function()
	{
		deleteTable(); 
		callSelect(); //create new table
	});
	req.send(); //Send the content
	event.preventDefault(); 
}


function updateButton(id)
{
	
	var newForm = document.createElement("form"); 
	newForm.setAttribute("id", "newForm" + id); 
	
	
	var fieldset = document.createElement("fieldset");
	var legend = document.createElement("legend");
	var legendText = document.createTextNode("Update the workout");
	legend.appendChild(legendText);
	fieldset.appendChild(legend);
	
	var name = document.createElement("input");
	name.setAttribute('type','text');
	name.setAttribute('id','newName');
	fieldset.appendChild(document.createTextNode("Name"));
	fieldset.appendChild(name);

	
	var reps = document.createElement("input");
	reps.setAttribute('type','text');
	reps.setAttribute('id','newReps');
	fieldset.appendChild(document.createTextNode("Reps")); 
	fieldset.appendChild(reps);
	
	var weight = document.createElement("input");
	weight.setAttribute('type','text');
	weight.setAttribute('id','newWeight');
	fieldset.appendChild(document.createTextNode("Weight")); 
	fieldset.appendChild(weight);
	
	var date = document.createElement("input");
	date.setAttribute('type','text');
	date.setAttribute('id','newDate'); //punny
	fieldset.appendChild(document.createTextNode("Date")); 
	fieldset.appendChild(date);
	
	var unitsLBS = document.createElement("input");
	unitsLBS.setAttribute('type','radio');
	unitsLBS.setAttribute('name','newMeasure');
	var unitsKilos = document.createElement("input");
	unitsKilos.setAttribute('type','radio');
	unitsKilos.setAttribute('name','newMeasure');
	fieldset.appendChild(document.createTextNode("Units")); 
	fieldset.appendChild(unitsLBS);
	fieldset.appendChild(document.createTextNode("lbs"));
	fieldset.appendChild(unitsKilos);
	fieldset.appendChild(document.createTextNode("kilos"));	

	
	updateSubmitButton = document.createElement("button");
	theText = document.createTextNode("update");
	updateSubmitButton.appendChild(theText);
	updateSubmitButton.addEventListener("click", function (event)
	{
		updateGET(id);
		event.preventDefault(); //Stop page from refreshing
	}); //Reference the function that will do a get request to the update page
	fieldset.appendChild(updateSubmitButton);


	newForm.appendChild(fieldset); 
	var table = document.getElementById("tableID"); 
	document.body.insertBefore(newForm, table);
	
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
		
		var payload = {}; 
		payload.name = document.getElementById("name").value;
		payload.reps = document.getElementById("reps").value;
		payload.weight = document.getElementById("weight").value;
		payload.date = document.getElementById("date").value;
		var radio = document.getElementsByName("measure");

	    if(radio[0].checked) 
	    {
	    		payload.measure = "1";
	    }
	    else
	    {
	        payload.measure = "0";
	    }

		var req = new XMLHttpRequest();
		var requestString= "name=" + payload.name + "&reps=" + payload.reps + "&weight=" + payload.weight + "&date=" + payload.date + "&lbs=" + payload.units;
		
		req.open('GET', "http://52.35.2.29:3000/insert?" + requestString , true);
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
	var payload = {};
	payload.id = id;
	payload.name = document.getElementById("newName").value;
	payload.reps = document.getElementById("newReps").value;
	payload.weight = document.getElementById("newWeight").value;
	payload.date = document.getElementById("newDate").value;
	var radio = document.getElementsByName("newMeasure");
	
    if(radio[0].checked)
    {
    	payload.units = "1";
    }
    else
    {
    	payload.units = "0";
    }

	var req = new XMLHttpRequest();
	var requestString= "id=" + payload.id + "&name=" + payload.name + "&reps=" + payload.reps + "&weight=" + payload.weight + "&date=" + payload.date + "&lbs=" + payload.units;
	
	console.log("requestString: " + requestString)	
	
	req.open('GET', "http://52.35.2.29:3000/update?" + requestString , true);
	req.addEventListener('load',function()
	{
		
		deleteTable(); 
		callSelect(); 
		document.body.removeChild(document.getElementById("newForm" + id));
	});
	req.send(); 
	event.preventDefault(); 

};