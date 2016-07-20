function createTable()
{
	/*
	var newTable = document.createElement("table");
	var newHead = document.createElement("thead");
	var newBody = document.createElement("tbody");
	var newRow = document.createElement("tr");
	var newHeader = document.createElement("th");
	var newCell = document.createElement("td");
	*/

	var newTable = document.createElement("table");
	var newHead = document.createElement("thead");
	var newBody = document.createElement("tbody");

	for(var i = 1; i <= 4; i++)
	{
		if(i == 1)
		{
			var newRow = document.createElement("tr");
			
			for(var j = 1; j <= 4; j++)
			{
				var newHeader = document.createElement("th");
				newHeader.textContent = "Header " + j;
				newRow.appendChild(newHeader);
				
			}
			newHead.appendChild(newRow);

			
		}

		else
		{
			
			var newRow = document.createElement("tr");
			for(var k = 1; k <= 4; k++)
			{
				var newCell = document.createElement("td");
				newCell.textContent = i + ", " + k;
				newRow.appendChild(newCell);
			}

			newBody.appendChild(newRow);
		}
	}

	newTable.appendChild(newHead);
	newTable.appendChild(newBody);

	return newTable;

}

function createButton(name)
{
	var newButton = document.createElement("button");
	var buttonText = document.createTextNode(name);
	newButton.setAttribute("id", name);
	newButton.appendChild(buttonText);
	document.body.appendChild(newButton);
}

function move(direction)
{
	var selectedCell = document.getElementsByClassName("selected")[0];
	var selectedId = selectedCell.getAttribute("id");

	if (direction == "UP")
	{
		if (selectedId >= 4 && selectedId <= 11)
		{
			deSelected(selectedCell);
			var newId = Number(selectedId) - 4;
			var newSelect = document.getElementById(newId);
			setSelectedCell(newSelect);
		}

	}

	else if (direction == "DOWN")
	{
		if (selectedId >= 0 && selectedId <= 7)
		{
			deSelected(selectedCell);
			var newId = Number(selectedId) + 4;
			var newSelect = document.getElementById(newId);
			setSelectedCell(newSelect);

		}

	}

	else if (direction == "LEFT")
	{

		if (selectedId != 0 && selectedId != 4 && selectedId != 8)
		{
			deSelected(selectedCell);
			var newId = Number(selectedId) - 1;
			var newSelect = document.getElementById(newId);
			setSelectedCell(newSelect);
		}

	}

	else if (direction == "RIGHT")
	{
		if (selectedId != 3 && selectedId != 7 && selectedId != 11)
		{
			deSelected(selectedCell);
			var newId = Number(selectedId) + 1;
			var newSelect = document.getElementById(newId);
			setSelectedCell(newSelect);
		}
	}
}

function deSelected(selectedCell)
{
	selectedCell.removeAttribute("class");
	selectedCell.style.border = "solid black";
}

function setSelectedCell(select)
{
	select.style.border = "solid red";
	select.className = "selected";
}

function markCell()
{
	var selectedCell = document.getElementsByClassName("selected")[0];
	selectedCell.style.backgroundColor = "yellow";
}

var table44 = createTable();

document.body.appendChild(table44);

createButton("UP");
createButton("DOWN");
createButton("LEFT");
createButton("RIGHT");
createButton("Mark Cell");

var select = document.getElementsByTagName("td");
setSelectedCell(select[0]);

for(var i = 0; i <= 11; i++)
{
	select[i].id = i;
}


document.getElementById("UP").addEventListener("click", function(){move("UP");});
document.getElementById("DOWN").addEventListener("click", function(){move("DOWN");});
document.getElementById("LEFT").addEventListener("click", function(){move("LEFT");});
document.getElementById("RIGHT").addEventListener("click", function(){move("RIGHT");});
document.getElementById("Mark Cell").addEventListener("click", markCell);



