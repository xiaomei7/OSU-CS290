
 function buildTable(data) {
    var table = document.createElement("table");
	var btn = document.createElement("BUTTON");
	table.id = "myTable";
    var headRow = document.createElement("tr");
	var headCell = document.createElement("th");
	headCell.textContent = "ID";
	headRow.appendChild(headCell);
	headCell.style.border="thin solid black";
	headCell.style.textContent="5px";
	
	var headCell = document.createElement("th");
	headCell.textContent = "Name";
	headRow.appendChild(headCell);
	headCell.style.border="thin solid black";
	headCell.style.textContent="5px";
	
	var headCell = document.createElement("th");
	headCell.textContent = "Reps";
	headRow.appendChild(headCell);
	headCell.style.border="thin solid black";
	headCell.style.textContent="5px";
	
	var headCell = document.createElement("th");
	headCell.textContent = "Weight";
	headRow.appendChild(headCell);
	headCell.style.border="thin solid black";
	headCell.style.textContent="5px";
	
	var headCell = document.createElement("th");
	headCell.textContent = "Date";
	headRow.appendChild(headCell);
	headCell.style.border="thin solid black";
	headCell.style.textContent="5px";
	
	var headCell = document.createElement("th");
	headCell.textContent = "Pounds";
	headRow.appendChild(headCell);
	headCell.style.border="thin solid black";
	headCell.style.textContent="5px";
	
	table.appendChild(headRow);
	table.style.borderSpacing = '0px';
	
	if (data[0]!=null){ 
		var fields = Object.keys(data[0]);
		data.forEach(function(object) {
		  var row = document.createElement("tr");
		  fields.forEach(function(field) {
			var cell = document.createElement("td");
			cell.textContent = object[field];
			if (typeof object[field] == "number")
			  cell.style.textAlign = "right";
			row.appendChild(cell);
			cell.style.border= "thin solid black";
		  });
		  table.appendChild(row);
		}); 
	}
    return table;
 }

 function loaded(event){
		var req = new XMLHttpRequest();
		
		req.open("GET", 'http://52.25.198.76:3000/select', true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status < 400){
				
				var response = JSON.parse(req.responseText);			
				document.body.appendChild(buildTable(response));
				}
			});
		req.send();		
 }
  
   function reloaded(event){
		var table = document.getElementById("myTable");
		var req = new XMLHttpRequest();
		
		req.open("GET", 'http://52.25.198.76:3000/select', true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status < 400){
				var response = JSON.parse(req.responseText);			
				document.body.appendChild(buildTable(response));
				}
			});
		req.send();
 }
 
function add_button(){
		var table = document.getElementById("myTable");
		var req = new XMLHttpRequest();
		var wname = document.getElementById('wname').value ;
		var reps = document.getElementById("reps").value;
		var weight = document.getElementById("weight").value;
		var date = document.getElementById("date").value;
		var pounds = document.getElementById("pounds").value;
		
		if (wname!=""){
		req.open("GET", 'http://52.25.198.76:3000/insert?wname='+ wname +'&reps='+reps+'&weight='+weight+'&date='+date+'&pounds='+pounds, true);
		
		req.onreadystatechange=function() {
		if (req.readyState == 4 && req.status == 200) {
//			  addrow(wname,reps,weight,date,pounds);
			table.parentNode.removeChild(table);
			reloaded();
			}
		  };
		
		req.send(null);
		event.preventDefault(); 
		} else {
			alert("Not added. Name input missing");
		}
}	
	
function delete_button()
	{
		var table = document.getElementById("myTable");
		var req = new XMLHttpRequest();
		var deleteID = document.getElementById('delete_id').value ;
		
		
		req.open("GET", 'http://52.25.198.76:3000/delete?delete_id=' +deleteID, true);
		req.onreadystatechange=function() {
		if (req.readyState == 4 && req.status == 200) {
			}
		  };
		 
		req.send(null);
		event.preventDefault(); 
		table.parentNode.removeChild(table);
		reloaded();
}
function updatename()
	{
		var table = document.getElementById("myTable");
		
		var req = new XMLHttpRequest();
		var new_name = document.getElementById('ename').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updatename?ename=' + new_name + '&eid='+selected_id, true);
		req.onreadystatechange=function() {
		if (req.readyState == 4 && req.status == 200) {
			}
		  }
		};
		 
		req.send(null);
		event.preventDefault(); 
		table.parentNode.removeChild(table);
		reloaded();
}
function updatereps()
	{
		var table = document.getElementById("myTable");
		var req = new XMLHttpRequest();
		var new_rep = document.getElementById('ereps').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updatereps?ereps=' + new_rep + '&eid='+selected_id, true);
		req.onreadystatechange=function() {
		if (req.readyState == 4 && req.status == 200) {
			}
		  }
		};
		 
		req.send(null);
		event.preventDefault(); 
		table.parentNode.removeChild(table);
		reloaded();
}
function updateweight()
	{
		var table = document.getElementById("myTable");
		var req = new XMLHttpRequest();
		var new_weight = document.getElementById('eweight').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updateweight?eweight=' + new_weight + '&eid='+selected_id, true);
		req.onreadystatechange=function() {
		if (req.readyState == 4 && req.status == 200) {
			}
		  }
		};
		 
		req.send(null);
		event.preventDefault(); 
		table.parentNode.removeChild(table);
		reloaded();
}
function updatedate()
	{
		var table = document.getElementById("myTable");
		var req = new XMLHttpRequest();
		var new_date = document.getElementById('edate').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updatedate?edate=' + new_date + '&eid='+selected_id, true);
		req.onreadystatechange=function() {
		if (req.readyState == 4 && req.status == 200) {
			}
		  }
		};
		 
		req.send(null);
		event.preventDefault(); 
		table.parentNode.removeChild(table);
		reloaded();
}
function updatepounds()
	{
		var table = document.getElementById("myTable");
		var req = new XMLHttpRequest();
		var new_pounds = document.getElementById('epounds').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updatepounds?epounds=' + new_pounds + '&eid='+selected_id, true);
		req.onreadystatechange=function() {
		if (req.readyState == 4 && req.status == 200) {
			}
		  }
		};
		 
		req.send(null);
		event.preventDefault(); 
		table.parentNode.removeChild(table);
		reloaded();
}

 /*function addrow(id,wname, reps, weight, date, pounds){
	var table = document.getElementById("myTable");
	var row1 = table.insertRow(table.rows.length);
	
	var cell1 = row1.insertCell(0);
	cell1.textContent = id;
	cell1.style.border= "thin solid black";
	
	var cell1 = row1.insertCell(1);
	cell1.textContent = wname;
	cell1.style.border= "thin solid black";
	
	var cell1 = row1.insertCell(2);
	cell1.textContent = reps;
	cell1.style.border= "thin solid black";
	
	var cell1 = row1.insertCell(3);
	cell1.textContent = weight;
	cell1.style.border= "thin solid black";
	
	var cell1 = row1.insertCell(4);
	cell1.textContent = date;
	cell1.style.border= "thin solid black";
	
	var cell1 = row1.insertCell(5);
	cell1.textContent = pounds;
	cell1.style.border= "thin solid black";
	  
}*/

 
