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
		var deleteButton = document.createElement("button");
		var deleteText = document.createTextNode("delete");
		deleteButton.appendChild(deleteText);

		deleteButton.id = newRow.firstChild.textContent;
		deleteButton.onclick = function(x)
		{
			return function()
			{
				deleteRow(x);
			};
		}(deleteButton.id);  
		newRow.appendChild(deleteButton);
		
		// Edit
		var editButton = document.createElement("button");
		var upText = document.createTextNode("edit");
		editButton.appendChild(upText);

		editButton.id = newRow.firstChild.textContent;
		editButton.onclick = function(x)
		{
			return function()
			{
				editRow(x);
			};
		}(editButton.id); 
		newRow.appendChild(editButton);
		
		newBody.appendChild(newRow);
	}
}


function deleteRow(id)
{
	var req = new XMLHttpRequest();
	var url = "http://52.35.2.29:3000/delete?id=" + id;
	req.open('GET', url, true);

	req.addEventListener('load',function()
	{
		if(req.status >= 200 && req.status < 400)
		{
			deleteTable(); 
			callSelect(); 
		}

		else 
		{
			console.log("Error in network request: " + request.statusText);
		}

	});

	req.send(null); 
	event.preventDefault(); 
};

function editRow(id)
{
	
	var newForm = document.createElement("form"); 
	newForm.setAttribute("id", "newForm" + id); 
	
	
	var fieldset = document.createElement("fieldset");
	var legend = document.createElement("legend");
	var legendText = document.createTextNode("Update your exercise:");

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
	fieldset.appendChild(document.createTextNode("kgs"));	

	
	updateSubmitButton = document.createElement("button");
	theText = document.createTextNode("update");
	updateSubmitButton.appendChild(theText);
	updateSubmitButton.addEventListener("click", function (event)
	{
		updateGET(id);
		event.preventDefault();
	}); 
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
		
		var dataInput = {}; 
		dataInput.name = document.getElementById("name").value;
		dataInput.reps = document.getElementById("reps").value;
		dataInput.weight = document.getElementById("weight").value;
		dataInput.date = document.getElementById("date").value;
		var radioButton = document.getElementsByName("measure");

	    if(radioButton[0].checked) 
	    {
	    	dataInput.measure = 1;
	    }
	    else
	    {
	        dataInput.measure = 0;
	    }

		var req = new XMLHttpRequest();
		var url= "http://52.35.2.29:3000/insert?name=" 
		+ dataInput.name + "&reps=" + dataInput.reps + "&weight=" 
		+ dataInput.weight + "&date=" + dataInput.date + "&lbs=" + dataInput.measure;
		
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
    	dataInput.measure = 1;
    }
    else
    {
    	dataInput.measure = 0;
    }

	var req = new XMLHttpRequest();
	var url= "http://52.35.2.29:3000/edit?id=" + dataInput.id 
	+ "&name=" + dataInput.name + "&reps=" + dataInput.reps + "&weight=" 
	+ dataInput.weight + "&date=" + dataInput.date + "&lbs=" + dataInput.measure;
		
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


