document.addEventListener('DOMContentLoaded', bindButton);
document.addEventListener('DOMContentLoaded', selectTable);

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

	newTable.setAttribute("align", "center");
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
			selectTable(); 
		}

		else 
		{
			console.log("Error in network request: " + request.statusText);
		}

	});

	req.send(null); 
	event.preventDefault(); 
};


// reference: https://www.formget.com/javascript-contact-form/
function editRow(id)
{

	var newForm = document.createElement("form"); 
	newForm.setAttribute("id", "newForm" + id);

	var heading = document.createElement('h3'); // Heading of Form
	heading.innerHTML = "Update Your Entry: ";
	newForm.appendChild(heading);

	var fieldset = document.createElement("fieldset");
	fieldset.setAttribute("class", "updateForm");
	var legend = document.createElement("legend");
	var legendText = document.createTextNode("Enter What you want to change:");

	legend.appendChild(legendText);
	fieldset.appendChild(legend);
	
	var name = document.createElement("input");
	name.setAttribute("type", "text");
	name.setAttribute("id", "newName");
	nameText =document.createTextNode("Name ");
	fieldset.appendChild(nameText);
	fieldset.appendChild(name);


	var reps = document.createElement("input");
	reps.setAttribute("type", "text");
	reps.setAttribute("id", "newReps");
	repsText = document.createTextNode("Reps ");
	fieldset.appendChild(repsText); 
	fieldset.appendChild(reps);

	
	var weight = document.createElement("input");
	weight.setAttribute("type", "text");
	weight.setAttribute("id", "newWeight");
	weightText = document.createTextNode("Weight ");
	fieldset.appendChild(weightText); 
	fieldset.appendChild(weight);

	var measureLbs = document.createElement("input");
	measureLbs.setAttribute("type", "radio");
	measureLbs.setAttribute("name", "newMeasure");
	measreLbsText = document.createTextNode("lbs");

	var measureKgs = document.createElement("input");
	measureKgs.setAttribute("type", "radio");
	measureKgs.setAttribute("name", "newMeasure");
	measureKgsText = document.createTextNode("kgs  ");

	fieldset.appendChild(measureLbs);
	fieldset.appendChild(measreLbsText);
	fieldset.appendChild(measureKgs);
	fieldset.appendChild(measureKgsText);

	
	var date = document.createElement("input");
	date.setAttribute("type", "text");
	date.setAttribute("id", "newDate"); 
	dateText = document.createTextNode("    Date ");
	fieldset.appendChild(dateText); 
	fieldset.appendChild(date);

	var line = document.createElement('hr'); // Giving Horizontal Row After Heading
	fieldset.appendChild(line);


	updateButton = document.createElement("button");
	buttonName = document.createTextNode("update");
	updateButton.appendChild(buttonName);
	updateButton.addEventListener("click", function (event)
	{
		updateTable(id);
		event.preventDefault();
	}); 
	fieldset.appendChild(updateButton);

	

	newForm.appendChild(fieldset); 
	var table = document.getElementById("tableID"); 
	document.body.insertBefore(newForm, table);

}


function deleteTable()
{
	var table = document.getElementById('tableID');
	table.parentNode.removeChild(table); 
}

function selectTable()
{
	var req = new XMLHttpRequest();
	var url = "http://52.35.2.29:3000/all";

	req.open('GET', url, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function()
	{
		var response = JSON.parse(req.responseText); 
		createTable(response); 
	});
	req.send(null); 
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

		if (dataInput.name == "") 
		{
            alert("Please entert the name!");
            return;
        }

	    if(radioButton[0].checked) 
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
		+ dataInput.weight + "&date=" + dataInput.date + "&lbs=" + dataInput.measure;
		
		req.open('GET', url, true);
		req.addEventListener('load',function()
		{
			deleteTable(); 
			selectTable(); 
		});

		req.send(null); 
		event.preventDefault(); 
	});
};

function updateTable(id)
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
    	dataInput.measure = "1";
    }
    else
    {
    	dataInput.measure = "0";
    }

	var req = new XMLHttpRequest();
	var url= "http://52.35.2.29:3000/edit?id=" + dataInput.id 
	+ "&name=" + dataInput.name + "&reps=" + dataInput.reps + "&weight=" 
	+ dataInput.weight + "&date=" + dataInput.date + "&lbs=" + dataInput.measure;
		
	req.open('GET', url , true);
	req.addEventListener('load',function()
	{
		deleteTable(); 
		selectTable(); 
		document.body.removeChild(document.getElementById("newForm" + id));
	});

	req.send(null); 
	event.preventDefault(); 

};


