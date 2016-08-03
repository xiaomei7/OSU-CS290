
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
	var newRow = document.createElement("tr"); 
	
	newHead.appendChild(newRow);

	for(var i in headers)
	{
		var newHeader = document.createElement("th");
		newHeader.textContent = headers[i];
		newRow.appendChild(newHeader);
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
			newBody.appendChild(newRow);
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
};

function deleteButton(id){
	//make request to insert page 
	var req = new XMLHttpRequest();
	req.open('GET', "http://52.36.135.10:3000/delete?id=" + id , true);
	req.addEventListener('load',function(){
		//delete table and then insert new table
		deleteTable(); //delete old table
		callSelect(); //create new table
	});
	req.send(); //Send the content
	event.preventDefault(); //Stop page from refreshing
};


function updateButton(id){
	//Create form and set attributes*******************************
	var upForm = document.createElement("form"); //create form element
	upForm.setAttribute("id", "upForm" + id); //Give the form the same ID as the data we are changing
	
	//***********************************************************
	
	//Create fieldset + label**********************************
	var fieldset = document.createElement("fieldset");
	var legend = document.createElement("legend");
	var legendText = document.createTextNode("Update the workout");
	legend.appendChild(legendText);
	fieldset.appendChild(legend);
	//********************************************************
	
	//Below are the input text boxes of the form**************
	var name = document.createElement("input");
	name.setAttribute('type','text');
	name.setAttribute('id','upName');
	fieldset.appendChild(document.createTextNode("Name")); //Label the text box
	fieldset.appendChild(name);

	
	var reps = document.createElement("input");
	reps.setAttribute('type','text');
	reps.setAttribute('id','upReps');
	fieldset.appendChild(document.createTextNode("Reps")); //Label the text box
	fieldset.appendChild(reps);
	
	var weight = document.createElement("input");
	weight.setAttribute('type','text');
	weight.setAttribute('id','upWeight');
	fieldset.appendChild(document.createTextNode("Weight")); //Label the text box
	fieldset.appendChild(weight);
	
	var date = document.createElement("input");
	date.setAttribute('type','text');
	date.setAttribute('id','upDate'); //punny
	fieldset.appendChild(document.createTextNode("Date")); //Label the text box
	fieldset.appendChild(date);
	
	var unitsLBS = document.createElement("input");
	unitsLBS.setAttribute('type','radio');
	unitsLBS.setAttribute('name','upUnits');
	var unitsKilos = document.createElement("input");
	unitsKilos.setAttribute('type','radio');
	unitsKilos.setAttribute('name','upUnits');
	fieldset.appendChild(document.createTextNode("Units")); //Label the radio buttons
	fieldset.appendChild(unitsLBS);
	fieldset.appendChild(document.createTextNode("lbs"));
	fieldset.appendChild(unitsKilos);
	fieldset.appendChild(document.createTextNode("kilos"));	
	//*******************************************************

	//Create submit button************************************
	updateSubmitButton = document.createElement("BUTTON");
	theText = document.createTextNode("Update");
	updateSubmitButton.appendChild(theText);
	updateSubmitButton.addEventListener("click", function (event){
		updateGET(id);
		event.preventDefault(); //Stop page from refreshing
	}); //Reference the function that will do a get request to the update page
	fieldset.appendChild(updateSubmitButton);
	//*******************************************************

	upForm.appendChild(fieldset); //append the fieldset to the form	
	var table = document.getElementById("tableID"); //Get the table ID so I can put the form above it in the next line
	document.body.insertBefore(upForm, table);

	
	
};